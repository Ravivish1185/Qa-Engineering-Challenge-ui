import { createLogger, transports, format } from 'winston';
import { transport } from './logger';
export const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      dirname: 'eneco-logs',
      filename: 'eneco-ui-run.log',
    }),
    transport
  ],
  format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level}: ${message}`;
      })
  ),
});