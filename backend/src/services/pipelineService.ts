import fs from 'node:fs/promises'
import path from 'node:path'
import { extractTextBatch } from './ocrService.js'
import { generateSummary, generateQuiz } from './aiService.js'
import { getSupabaseClient } from '../db/supabaseClient.js'
import { getManualContent, getSessionSource } from './manualInputService.js'
import logger from '../utils/logger.js'
import { config } from '../utils/env.js'

const listSessionFiles = async (sessionId: string): Promise<string[]> => {
  const sessionDir = path.join(config.storage.localDir, sessionId)
  try {
    const entries = await fs.readdir(sessionDir)
    return entries.map((file: string) => path.join(sessionDir, file))
  } catch (error) {
    logger.warn({ sessionId }, 'No local screenshots found for session')
    return []
  }
}

/**
 * Get content from session (either manual input or OCR from screenshots)
 */
const getSessionContent = async (sessionId: string): Promise<string> => {
  try {
    const source = await getSessionSource(sessionId)

    // If it's a manual input session, get the content directly
    if (source !== 'capture') {
      const content = await getManualContent(sessionId)
      logger.info(
        { sessionId, source, contentLength: content.length },
        'Using manual input content'
      )
      return content
    }

    // Otherwise, process screenshots with OCR
    const filePaths = await listSessionFiles(sessionId)
    if (filePaths.length === 0) {
      throw new Error('No screenshots or manual content available')
    }

    logger.info({ sessionId, fileCount: filePaths.length }, 'Starting OCR processing')
    const textSnippets = await extractTextBatch(filePaths)
    logger.info({ sessionId, snippetCount: textSnippets.length }, 'OCR complete')

    return textSnippets.join('\n\n')
  } catch (err) {
    logger.error({ err, sessionId }, 'Failed to get session content')
    throw err
  }
}

export const processSessionPipeline = async (sessionId: string): Promise<void> => {
  const client = getSupabaseClient()

  try {
    // Get content (manual or OCR)
    const content = await getSessionContent(sessionId)

    if (content.trim().length === 0) {
      logger.warn({ sessionId }, 'No content available to process')
      await client
        .from('sessions')
        .update({ status: 'failed' })
        .eq('id', sessionId)
      return
    }

    // Generate summary
    logger.info({ sessionId, contentLength: content.length }, 'Generating summary')
    const summary = await generateSummary([content])
    logger.info({ sessionId, summaryLength: summary.length }, 'Summary generated')

    // Generate quiz
    logger.info({ sessionId }, 'Generating quiz')
    const quiz = summary.trim().length > 0 ? await generateQuiz(summary) : []
    logger.info({ sessionId, quizCount: quiz.length }, 'Quiz generated')

    // Store results
    const { error: insertError } = await client
      .from('results')
      .insert({
        session_id: sessionId,
        summary,
        quiz,
        created_at: new Date().toISOString()
      })
      .select()

    if (insertError !== null) {
      logger.error(insertError, 'Failed to insert results')
      throw insertError
    }

    // Mark session as completed
    await client
      .from('sessions')
      .update({ status: 'completed' })
      .eq('id', sessionId)

    logger.info({ sessionId }, 'Session pipeline complete')

    // Clean up local files after successful processing (only for capture sessions)
    const source = await getSessionSource(sessionId)
    if (source === 'capture') {
      const sessionDir = path.join(config.storage.localDir, sessionId)
      try {
        await fs.rm(sessionDir, { recursive: true, force: true })
        logger.info({ sessionDir }, 'Cleaned up local screenshots')
      } catch (cleanupError) {
        logger.warn(cleanupError, 'Failed to clean up local files')
      }
    }
  } catch (error) {
    logger.error({ sessionId, error }, 'Session pipeline failed')
    try {
      await client
        .from('sessions')
        .update({ status: 'failed' })
        .eq('id', sessionId)
    } catch (dbError) {
      logger.error(dbError, 'Failed to update session status')
    }
  }
}

