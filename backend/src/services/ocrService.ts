import { createWorker, type Worker } from 'tesseract.js'
import logger from '../utils/logger.js'

let workerPromise: Promise<Worker> | null = null

const initWorker = async (): Promise<Worker> => {
  const worker = await createWorker('eng', 1, {
    logger: (message: { status?: string, progress?: number }) => {
      if (message.status === 'recognizing text') {
        logger.debug({ progress: message.progress }, 'OCR progress')
      }
    }
  })
  return worker
}

const getWorker = async (): Promise<Worker> => {
  if (workerPromise === null) {
    workerPromise = initWorker()
  }
  return await workerPromise
}

export const extractTextFromImage = async (filePath: string): Promise<string> => {
  try {
    const worker = await getWorker()
    const { data } = await worker.recognize(filePath)
    const text = data.text?.trim() ?? ''
    logger.info({ filePath }, 'OCR complete for image')
    return text
  } catch (error) {
    logger.error(error, 'Failed to run OCR on image')
    throw error
  }
}

export const extractTextBatch = async (filePaths: string[]): Promise<string[]> => {
  const results: string[] = []
  for (const filePath of filePaths) {
    const text = await extractTextFromImage(filePath)
    if (text.length > 0) {
      results.push(text)
    }
  }
  return results
}
