import { createLogger, transports, format } from 'winston'
const { timestamp: timestampFn, combine, printf } = format

// Format function
const myFormat = printf(
    ({ level, message, timestamp }) => `${level}: ${message} - ${timestamp}`
)

const logger = createLogger({
    format: combine(timestampFn(), myFormat),
})

logger.add(
    new transports.Console({
        handleExceptions: true,
        format: combine(timestampFn(), myFormat),
    })
)

logger.on('error', (err) => console.error(err.message))

export default logger
