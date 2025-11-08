import multer from 'multer'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import type { Request, Express } from 'express'
import type { FileFilterCallback } from 'multer'
import { config } from '../utils/env.js'

const ensureDirectory = (dir: string): void => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

ensureDirectory(config.storage.localDir)

const storage = multer.diskStorage({
  destination: (req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    const sessionId = req.params.sessionId ?? 'general'
    const sessionDir = path.join(config.storage.localDir, sessionId)
    ensureDirectory(sessionDir)
    cb(null, sessionDir)
  },
  filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueSuffix = crypto.randomUUID()
    const extension = path.extname(file.originalname) || '.png'
    cb(null, `${uniqueSuffix}${extension}`)
  }
})

const imageFilter: multer.Options['fileFilter'] = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if ((file.mimetype ?? '').startsWith('image/')) {
    cb(null, true)
    return
  }
  cb(new Error('Only image uploads are supported'))
}

export const upload = multer({
  storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 8 * 1024 * 1024
  }
})
