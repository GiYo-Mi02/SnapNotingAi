import logger from '../utils/logger.js';
export const errorHandler = (err, _req, res, _next) => {
    logger.error(err, 'Unhandled error');
    const status = typeof err.status === 'number' ? err.status : 500;
    const message = err.message ?? 'Unexpected server error';
    res.status(status).json({
        success: false,
        message
    });
};
