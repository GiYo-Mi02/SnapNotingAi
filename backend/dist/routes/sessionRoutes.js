import { Router } from 'express';
import { createSession, stopSession, uploadScreenshot, processSession, getSessionResults, listSessionScreenshots, listAllSessions } from '../controllers/sessionController.js';
import { submitManualText, submitAudioTranscript, uploadDocument } from '../controllers/manualInputController.js';
import { upload, uploadDocument as uploadDocumentMiddleware } from '../middleware/upload.js';
const router = Router();
// Capture session routes
router.post('/sessions', createSession);
router.get('/sessions', listAllSessions);
router.post('/sessions/:sessionId/stop', stopSession);
router.post('/sessions/:sessionId/upload', upload.single('image'), uploadScreenshot);
router.post('/sessions/:sessionId/process', processSession);
router.get('/sessions/:sessionId/results', getSessionResults);
router.get('/sessions/:sessionId/screenshots', listSessionScreenshots);
// Manual input routes
router.post('/manual/text', submitManualText);
router.post('/manual/transcript', submitAudioTranscript);
router.post('/manual/document', uploadDocumentMiddleware.single('document'), uploadDocument);
export default router;
