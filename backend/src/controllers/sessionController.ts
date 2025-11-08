import type { RequestHandler } from 'express'
import { getSupabaseClient } from '../db/supabaseClient.js'
import logger from '../utils/logger.js'
import { persistScreenshot } from '../services/storageService.js'
import { processSessionPipeline } from '../services/pipelineService.js'

export const createSession: RequestHandler = async (req, res, next) => {
  try {
    const client = getSupabaseClient()
    const { userId } = req.body ?? {}
    const { data, error } = await client
      .from('sessions')
      .insert({
        user_id: userId ?? null,
        status: 'active',
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error !== null) {
      throw error
    }

    res.status(201).json({ success: true, session: data })
  } catch (error) {
    next(error)
  }
}

export const stopSession: RequestHandler = async (req, res, next) => {
  const { sessionId } = req.params
  try {
    const client = getSupabaseClient()
    const { data, error } = await client
      .from('sessions')
      .update({
        status: 'processing',
        stopped_at: new Date().toISOString()
      })
      .eq('id', sessionId)
      .select()
      .single()

    if (error !== null) {
      throw error
    }

    res.json({ success: true, session: data })

    // Run pipeline in the background without blocking the response
    processSessionPipeline(sessionId).catch((pipelineError) => {
      logger.error(pipelineError, 'Background pipeline failed')
    })
  } catch (error) {
    next(error)
  }
}

export const uploadScreenshot: RequestHandler = async (req, res, next) => {
  const { sessionId } = req.params
  try {
    if (req.file === undefined) {
      res.status(400).json({ success: false, message: 'No file uploaded' })
      return
    }

    const stored = await persistScreenshot({
      sessionId,
      localFilePath: req.file.path,
      originalName: req.file.originalname
    })

    res.status(201).json({ success: true, screenshot: stored })
  } catch (error) {
    next(error)
  }
}

export const processSession: RequestHandler = async (req, res, next) => {
  const { sessionId } = req.params
  try {
    logger.info({ sessionId }, 'Process endpoint called (pipeline runs in background)')
    // Pipeline already runs in background from stopSession
    // This endpoint just acknowledges the request
    res.json({ success: true, message: 'Pipeline processing in background' })
  } catch (error) {
    next(error)
  }
}

export const getSessionResults: RequestHandler = async (req, res, next) => {
  const { sessionId } = req.params
  try {
    const client = getSupabaseClient()
    const { data, error } = await client
      .from('results')
      .select('*')
      .eq('session_id', sessionId)
      .maybeSingle()

    if (error !== null) {
      throw error
    }

    if (data === null) {
      res.status(404).json({ success: false, message: 'Results not ready yet' })
      return
    }

    res.json({ success: true, result: data })
  } catch (error) {
    next(error)
  }
}

export const listSessionScreenshots: RequestHandler = async (req, res, next) => {
  const { sessionId } = req.params
  try {
    const client = getSupabaseClient()
    const { data, error } = await client
      .from('screenshots')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })

    if (error !== null) {
      throw error
    }

    res.json({ success: true, screenshots: data })
  } catch (error) {
    next(error)
  }
}

export const listAllSessions: RequestHandler = async (req, res, next) => {
  try {
    const client = getSupabaseClient()
    const { limit = 50, offset = 0 } = req.query
    const pageLimit = Math.min(Number(limit) || 50, 100)
    const pageOffset = Number(offset) || 0

    const { data: sessions, error: sessionsError } = await client
      .from('sessions')
      .select('*')
      .order('created_at', { ascending: false })
      .range(pageOffset, pageOffset + pageLimit - 1)

    if (sessionsError !== null) {
      throw sessionsError
    }

    // Fetch results for each session
    const sessionsWithResults = await Promise.all(
      (sessions ?? []).map(async (session) => {
        const { data: result } = await client
          .from('results')
          .select('summary')
          .eq('session_id', session.id)
          .maybeSingle()

        return {
          ...session,
          summary_preview: result?.summary ? result.summary.substring(0, 150) + '...' : null
        }
      })
    )

    res.json({ success: true, sessions: sessionsWithResults })
  } catch (error) {
    next(error)
  }
}
