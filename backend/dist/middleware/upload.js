import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { config } from '../utils/env.js';
const ensureDirectory = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};
ensureDirectory(config.storage.localDir);
const storage = multer.diskStorage({
    destination: (req, _file, cb) => {
        const sessionId = req.params.sessionId ?? 'general';
        const sessionDir = path.join(config.storage.localDir, sessionId);
        ensureDirectory(sessionDir);
        cb(null, sessionDir);
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = crypto.randomUUID();
        const extension = path.extname(file.originalname) || '.png';
        cb(null, `${uniqueSuffix}${extension}`);
    }
});
const imageFilter = (_req, file, cb) => {
    if ((file.mimetype ?? '').startsWith('image/')) {
        cb(null, true);
        return;
    }
    cb(new Error('Only image uploads are supported'));
};
const documentFilter = (_req, file, cb) => {
    const allowedMimeTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
        'application/msword', // .doc
        'text/plain' // .txt
    ];
    const allowedExtensions = ['.pdf', '.docx', '.doc', '.txt'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (allowedMimeTypes.includes(file.mimetype ?? '') || allowedExtensions.includes(fileExtension)) {
        cb(null, true);
        return;
    }
    cb(new Error(`Unsupported file format. Supported formats: ${allowedExtensions.join(', ')}`));
};
export const upload = multer({
    storage,
    fileFilter: imageFilter,
    limits: {
        fileSize: 8 * 1024 * 1024
    }
});
// Separate upload instance for documents with larger file size limit
export const uploadDocument = multer({
    storage: multer.memoryStorage(),
    fileFilter: documentFilter,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB for documents
    }
});
