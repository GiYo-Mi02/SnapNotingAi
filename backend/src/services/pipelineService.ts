import fs from 'node:fs/promises'
import path from 'node:path'
import { extractTextBatch } from './ocrService.js'
import { generateSummary, generateQuiz } from './aiService.js'
import { getSupabaseClient } from '../db/supabaseClient.js'
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

export const processSessionPipeline = async (sessionId: string): Promise<void> => {
  const client = getSupabaseClient()

  const filePaths = await listSessionFiles(sessionId)
  if (filePaths.length === 0) {
    logger.warn({ sessionId }, 'No screenshots available to process')
    await client
      .from('sessions')
      .update({ status: 'failed' })
      .eq('id', sessionId)
    return
  }

  try {
    logger.info({ sessionId, fileCount: filePaths.length }, 'Starting OCR processing')
    const textSnippets = await extractTextBatch(filePaths)
    logger.info({ sessionId, snippetCount: textSnippets.length }, 'OCR complete')

    const summary = textSnippets.length > 0
      ? await generateSummary(textSnippets)
      : 'No readable text could be extracted from the captured screenshots.'
    logger.info({ sessionId, summaryLength: summary.length }, 'Summary generated')

    const quiz = summary.trim().length > 0 ? await generateQuiz(summary) : []
    logger.info({ sessionId, quizCount: quiz.length }, 'Quiz generated')

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

    await client
      .from('sessions')
      .update({ status: 'completed' })
      .eq('id', sessionId)

    logger.info({ sessionId }, 'Session pipeline complete')

    // Clean up local files after successful processing
    const sessionDir = path.join(config.storage.localDir, sessionId)
    try {
      await fs.rm(sessionDir, { recursive: true, force: true })
      logger.info({ sessionDir }, 'Cleaned up local screenshots')
    } catch (cleanupError) {
      logger.warn(cleanupError, 'Failed to clean up local files')
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
