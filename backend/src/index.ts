import express, { type Request, type Response } from 'express'
import cors from 'cors'
import path from 'node:path'
import { config, validateEnv } from './utils/env.js'
import sessionRoutes from './routes/sessionRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'
import logger from './utils/logger.js'

const app = express()

app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.resolve(config.storage.localDir)))
app.use('/api', sessionRoutes)
app.use(errorHandler)

const bootstrap = async (): Promise<void> => {
  try {
    validateEnv()
  } catch (error) {
    logger.warn(error, 'Environment validation failed; continuing with limited functionality')
  }

  app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', time: new Date().toISOString() })
  })

  app.listen(config.port, () => {
    logger.info({ port: config.port }, 'SnapNotesAI backend listening')
  })
}

void bootstrap()
