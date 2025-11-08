import { Router } from 'express'
import {
  createSession,
  stopSession,
  uploadScreenshot,
  processSession,
  getSessionResults,
  listSessionScreenshots,
  listAllSessions
} from '../controllers/sessionController.js'
import { upload } from '../middleware/upload.js'

const router = Router()

router.post('/sessions', createSession)
router.get('/sessions', listAllSessions)
router.post('/sessions/:sessionId/stop', stopSession)
router.post('/sessions/:sessionId/upload', upload.single('image'), uploadScreenshot)
router.post('/sessions/:sessionId/process', processSession)
router.get('/sessions/:sessionId/results', getSessionResults)
router.get('/sessions/:sessionId/screenshots', listSessionScreenshots)

export default router
