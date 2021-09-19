import winston, { createLogger, transports, format } from 'winston';
const { timestamp: timestampFn, combine, printf, colorize, prettyPrint } = format;

// Format function
const myFormat = printf(({ level, message, timestamp }) => `${timestamp}: ${level}----> ${message} `);

const logger = createLogger({
  format: combine(colorize(), timestampFn(), prettyPrint(), myFormat),
});

logger.add(new transports.Console());

winston.addColors({
  info: 'green',
  error: 'red',
});
logger.on('error', (err) => console.error(err.message));

export default logger;
