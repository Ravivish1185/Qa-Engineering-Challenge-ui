import  DailyRotateFile from 'winston-daily-rotate-file';

/**
 * This method is used for logging the error, info and debug
 */
export const transport: DailyRotateFile = new DailyRotateFile({
  filename: 'logs/eneco-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});