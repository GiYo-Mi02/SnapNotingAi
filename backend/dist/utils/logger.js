import pino from 'pino';
const logger = pino.default({
    level: process.env.LOG_LEVEL ?? 'info'
}, pino.transport({
    target: 'pino-pretty',
    options: {
        colorize: true,
        ignore: 'pid,hostname'
    }
}));
export default logger;
