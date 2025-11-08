import type { RequestHandler } from 'express'
import {
  createManualSession,
  updateManualSessionStatus
} from '../services/manualInputService.js'
import {
  extractTextFromDocument,
  validateDocumentFile
} from '../services/documentService.js'
import { processSessionPipeline } from '../services/pipelineService.js'
import logger from '../utils/logger.js'

/**
 * Submit manual text for processing
 * POST /api/manual/text
 * Body: { content: string }
 */
export const submitManualText: RequestHandler = async (req, res, next) => {
  try {
    const { content } = req.body as { content?: string }

    if (!content || content.trim().length === 0) {
      res.status(400).json({
        success: false,
        message: 'Content cannot be empty'
      })
      return
    }

    if (content.length > 1000000) {
      res.status(400).json({
        success: false,
        message: 'Content exceeds maximum length (1MB)'
      })
      return
    }

    // Create session
    const session = await createManualSession({
      content: content.trim(),
      source: 'text'
    })

    // Start pipeline in background (don't wait)
    processSessionPipeline(session.id).catch((pipelineErr) => {
      logger.error(
        { err: pipelineErr, sessionId: session.id },
        'Background pipeline failed'
      )
    })

    logger.info(
      {
        sessionId: session.id,
        contentLength: content.length
      },
      'Manual text submitted'
    )

    res.status(201).json({
      success: true,
      sessionId: session.id,
      message: 'Text submitted successfully. Processing started.',
      contentLength: content.length
    })
  } catch (err) {
    logger.error({ err }, 'Failed to submit manual text')
    next(err)
  }
}

/**
 * Submit audio transcript for processing
 * POST /api/manual/transcript
 * Body: { transcript: string }
 */
export const submitAudioTranscript: RequestHandler = async (req, res, next) => {
  try {
    const { transcript } = req.body as { transcript?: string }

    if (!transcript || transcript.trim().length === 0) {
      res.status(400).json({
        success: false,
        message: 'Transcript cannot be empty'
      })
      return
    }

    if (transcript.length > 1000000) {
      res.status(400).json({
        success: false,
        message: 'Transcript exceeds maximum length (1MB)'
      })
      return
    }

    // Create session
    const session = await createManualSession({
      content: transcript.trim(),
      source: 'audio_transcript'
    })

    // Start pipeline in background (don't wait)
    processSessionPipeline(session.id).catch((pipelineErr) => {
      logger.error(
        { err: pipelineErr, sessionId: session.id },
        'Background pipeline failed'
      )
    })

    logger.info(
      {
        sessionId: session.id,
        transcriptLength: transcript.length
      },
      'Audio transcript submitted'
    )

    res.status(201).json({
      success: true,
      sessionId: session.id,
      message: 'Transcript submitted successfully. Processing started.',
      transcriptLength: transcript.length
    })
  } catch (err) {
    logger.error({ err }, 'Failed to submit audio transcript')
    next(err)
  }
}

/**
 * Upload document (PDF, DOCX, DOC, TXT) for processing
 * POST /api/manual/document
 * Form data: file
 */
export const uploadDocument: RequestHandler = async (req, res, next) => {
  try {
    if (req.file === undefined) {
      res.status(400).json({
        success: false,
        message: 'No file uploaded'
      })
      return
    }

    const fileName = req.file.originalname
    const fileSize = req.file.size

    // Validate document
    const validation = validateDocumentFile(fileName, fileSize)
    if (!validation.valid) {
      res.status(400).json({
        success: false,
        message: validation.error
      })
      return
    }

    // Extract text from document
    let content: string
    try {
      content = await extractTextFromDocument(req.file.buffer, fileName)
    } catch (extractErr) {
      logger.error({ err: extractErr, fileName }, 'Failed to extract document content')
      res.status(400).json({
        success: false,
        message: 'Failed to extract text from document. File may be corrupted or unsupported.'
      })
      return
    }

    if (content.trim().length === 0) {
      res.status(400).json({
        success: false,
        message: 'No text could be extracted from document'
      })
      return
    }

    // Create session
    const session = await createManualSession({
      content: content.trim(),
      source: 'document',
      fileName
    })

    // Start pipeline in background (don't wait)
    processSessionPipeline(session.id).catch((pipelineErr) => {
      logger.error(
        { err: pipelineErr, sessionId: session.id },
        'Background pipeline failed'
      )
    })

    logger.info(
      {
        sessionId: session.id,
        fileName,
        extractedChars: content.length,
        fileSize
      },
      'Document uploaded and processing started'
    )

    res.status(201).json({
      success: true,
      sessionId: session.id,
      fileName,
      extractedChars: content.length,
      message: 'Document uploaded successfully. Processing started.'
    })
  } catch (err) {
    logger.error({ err }, 'Failed to upload document')
    next(err)
  }
}
