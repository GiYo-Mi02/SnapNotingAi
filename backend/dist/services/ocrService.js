import { createWorker } from 'tesseract.js';
import logger from '../utils/logger.js';
let workerPromise = null;
const initWorker = async () => {
    const worker = await createWorker('eng', 1, {
        logger: (message) => {
            if (message.status === 'recognizing text') {
                logger.debug({ progress: message.progress }, 'OCR progress');
            }
        }
    });
    return worker;
};
const getWorker = async () => {
    if (workerPromise === null) {
        workerPromise = initWorker();
    }
    return await workerPromise;
};
export const extractTextFromImage = async (filePath) => {
    try {
        const worker = await getWorker();
        const { data } = await worker.recognize(filePath);
        const text = data.text?.trim() ?? '';
        logger.info({ filePath }, 'OCR complete for image');
        return text;
    }
    catch (error) {
        logger.error(error, 'Failed to run OCR on image');
        throw error;
    }
};
export const extractTextBatch = async (filePaths) => {
    const results = [];
    for (const filePath of filePaths) {
        const text = await extractTextFromImage(filePath);
        if (text.length > 0) {
            results.push(text);
        }
    }
    return results;
};
