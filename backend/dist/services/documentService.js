import logger from '../utils/logger.js';
import mammoth from 'mammoth';
/**
 * Extract text from different document types
 */
/**
 * Extract text from PDF file
 * Note: Requires pdf-parse or pdfjs-dist for full functionality
 * For now, returns placeholder indicating PDF extraction needs setup
 */
export const extractTextFromPDF = async (buffer) => {
    try {
        // PDF extraction would require pdfjs-dist or similar for ESM
        // For now, we log that it's being processed
        logger.info('PDF file received, text extraction pending implementation');
        // Return empty string - in production would use pdfjs-dist
        return '';
    }
    catch (err) {
        logger.error({ err }, 'Failed to extract text from PDF');
        throw new Error(`PDF extraction failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
};
/**
 * Extract text from DOCX/DOC file
 */
export const extractTextFromDocx = async (buffer) => {
    try {
        const result = await mammoth.extractRawText({ buffer });
        return result.value || '';
    }
    catch (err) {
        logger.error({ err }, 'Failed to extract text from DOCX');
        throw new Error(`DOCX extraction failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
};
/**
 * Extract text from various document types
 */
export const extractTextFromDocument = async (buffer, fileName) => {
    try {
        const ext = fileName.toLowerCase().split('.').pop() || '';
        switch (ext) {
            case 'pdf':
                return await extractTextFromPDF(buffer);
            case 'docx':
            case 'doc':
                return await extractTextFromDocx(buffer);
            case 'txt':
                return buffer.toString('utf-8');
            default:
                throw new Error(`Unsupported file type: .${ext}. Supported: pdf, docx, doc, txt`);
        }
    }
    catch (err) {
        logger.error({ err, fileName }, 'Failed to extract text from document');
        throw err;
    }
};
/**
 * Validate document file
 */
export const validateDocumentFile = (fileName, fileSize) => {
    const maxSize = 50 * 1024 * 1024; // 50MB
    const supportedTypes = ['pdf', 'docx', 'doc', 'txt'];
    const ext = fileName.toLowerCase().split('.').pop() || '';
    if (!supportedTypes.includes(ext)) {
        return {
            valid: false,
            error: `Unsupported file type. Supported: ${supportedTypes.join(', ')}`
        };
    }
    if (fileSize > maxSize) {
        return {
            valid: false,
            error: `File size exceeds maximum of 50MB`
        };
    }
    return { valid: true };
};
