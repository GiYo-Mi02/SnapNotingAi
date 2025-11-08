import { getSupabaseClient } from '../db/supabaseClient.js'
import { randomUUID } from 'node:crypto'
import logger from '../utils/logger.js'

export interface ManualInputPayload {
  content: string
  source: 'text' | 'audio_transcript' | 'document'
  fileName?: string
}

/**
 * Create a manual input session with user-provided content
 * This bypasses screen capture and goes directly to processing
 */
export const createManualSession = async (payload: ManualInputPayload) => {
  try {
    const client = getSupabaseClient()
    const sessionId = randomUUID()

    // Validate content
    if (!payload.content || payload.content.trim().length === 0) {
      throw new Error('Content cannot be empty')
    }

    // Create session with manual content
    const { data: session, error: sessionError } = await client
      .from('sessions')
      .insert({
        id: sessionId,
        user_id: null,
        status: 'processing',
        source: payload.source,
        manual_content: payload.content.trim(),
        file_name: payload.fileName || null,
        created_at: new Date().toISOString(),
        stopped_at: new Date().toISOString() // Manual sessions are "stopped" immediately
      })
      .select()
      .single()

    if (sessionError !== null) {
      throw sessionError
    }

    logger.info(
      {
        sessionId,
        source: payload.source,
        contentLength: payload.content.length,
        fileName: payload.fileName
      },
      'Manual session created'
    )

    return session
  } catch (err) {
    logger.error({ err, payload }, 'Failed to create manual session')
    throw err
  }
}

/**
 * Get the manual content from a session
 */
export const getManualContent = async (sessionId: string): Promise<string> => {
  try {
    const client = getSupabaseClient()

    const { data, error } = await client
      .from('sessions')
      .select('manual_content, source')
      .eq('id', sessionId)
      .single()

    if (error !== null) {
      throw error
    }

    if (data?.manual_content === null) {
      throw new Error('No manual content found for this session')
    }

    return data?.manual_content || ''
  } catch (err) {
    logger.error({ err, sessionId }, 'Failed to get manual content')
    throw err
  }
}

/**
 * Get the content source type for a session
 */
export const getSessionSource = async (
  sessionId: string
): Promise<'text' | 'audio_transcript' | 'document' | 'capture'> => {
  try {
    const client = getSupabaseClient()

    const { data, error } = await client
      .from('sessions')
      .select('source')
      .eq('id', sessionId)
      .single()

    if (error !== null) {
      throw error
    }

    return (data?.source as 'text' | 'audio_transcript' | 'document' | 'capture') || 'capture'
  } catch (err) {
    logger.error({ err, sessionId }, 'Failed to get session source')
    throw err
  }
}

/**
 * Update manual session status
 */
export const updateManualSessionStatus = async (
  sessionId: string,
  status: 'processing' | 'completed' | 'failed'
) => {
  try {
    const client = getSupabaseClient()

    const { data, error } = await client
      .from('sessions')
      .update({ status })
      .eq('id', sessionId)
      .select()
      .single()

    if (error !== null) {
      throw error
    }

    logger.info({ sessionId, status }, 'Manual session status updated')
    return data
  } catch (err) {
    logger.error({ err, sessionId }, 'Failed to update manual session status')
    throw err
  }
}
