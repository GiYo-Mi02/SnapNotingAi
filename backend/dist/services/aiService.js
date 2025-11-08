import OpenAI from 'openai';
import logger from '../utils/logger.js';
import { config } from '../utils/env.js';
const buildClient = () => {
    if (config.openai.apiKey.length === 0) {
        logger.warn('OPENAI_API_KEY is not configured. Falling back to placeholder responses.');
        return null;
    }
    return new OpenAI({ apiKey: config.openai.apiKey });
};
export const generateSummary = async (textSegments) => {
    const client = buildClient();
    if (client === null) {
        return 'AI summarisation is not configured. Please add an OpenAI API key.';
    }
    const prompt = `You are an expert lecture note-taker. Combine the provided OCR snippets into a concise study summary.
- Use clear sections with headings where appropriate.
- Highlight key concepts, definitions, and action items.
- Keep the tone factual and student friendly.
Return the response in Markdown.`;
    const response = await client.chat.completions.create({
        model: config.openai.summaryModel,
        messages: [
            { role: 'system', content: prompt },
            { role: 'user', content: textSegments.join('\n\n') }
        ],
        temperature: 0.7
    });
    const summary = response.choices[0]?.message.content?.trim();
    if (summary === undefined) {
        logger.warn('OpenAI summary response returned no text');
        return 'Summary unavailable.';
    }
    return summary;
};
const quizSchema = {
    name: 'quiz_schema',
    schema: {
        type: 'object',
        properties: {
            questions: {
                type: 'array',
                items: {
                    type: 'object',
                    required: ['question', 'answer', 'type'],
                    properties: {
                        question: { type: 'string' },
                        type: { enum: ['multiple-choice', 'short-answer'] },
                        answer: { type: 'string' },
                        options: {
                            type: 'array',
                            items: {
                                type: 'object',
                                required: ['label', 'value'],
                                properties: {
                                    label: { type: 'string' },
                                    value: { type: 'string' }
                                }
                            }
                        }
                    }
                }
            }
        },
        required: ['questions']
    }
};
export const generateQuiz = async (summary) => {
    const client = buildClient();
    if (client === null) {
        return [];
    }
    const response = await client.chat.completions.create({
        model: config.openai.quizModel,
        messages: [
            {
                role: 'system',
                content: `You are an educational quiz generator. Create multiple-choice quiz questions based on the provided summary.
For each question, provide:
- A clear question
- 4 distinct answer options (A, B, C, D)
- The correct answer
- Type should be 'multiple-choice'

Return ONLY valid JSON in this exact format:
{
  "questions": [
    {
      "question": "What is...?",
      "type": "multiple-choice",
      "answer": "A",
      "options": [
        {"label": "Option A text", "value": "A"},
        {"label": "Option B text", "value": "B"},
        {"label": "Option C text", "value": "C"},
        {"label": "Option D text", "value": "D"}
      ]
    }
  ]
}

Make questions diverse (conceptual, factual, application-based). Each option should be plausible but only one correct.`
            },
            {
                role: 'user',
                content: `Create 5-8 quiz questions from this summary:\n\n${summary}`
            }
        ],
        temperature: 0.7
    });
    const jsonText = response.choices[0]?.message.content?.trim();
    if (jsonText === undefined) {
        logger.warn('OpenAI quiz response returned no text');
        return [];
    }
    try {
        const parsed = JSON.parse(jsonText);
        return parsed.questions ?? [];
    }
    catch (error) {
        logger.error(error, 'Failed to parse quiz JSON');
        // Try to extract JSON from the response if it has extra text
        const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
        if (jsonMatch !== null) {
            try {
                const parsed = JSON.parse(jsonMatch[0]);
                return parsed.questions ?? [];
            }
            catch {
                return [];
            }
        }
        return [];
    }
};
