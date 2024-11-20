const { createLogger, format, transport, level } = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ level, message, timestamp }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
    ),
    transports: [
        new transport.Console(),
        new transport.File({ filename: 'logs/error.log', level: 'error' }),
        new transport.File({ filename: 'logs/info.log', level: 'info'}),
    ],
});

module.exports = logger;