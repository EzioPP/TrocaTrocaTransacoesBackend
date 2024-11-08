import winston from 'winston';

const { combine, timestamp, align, printf, colorize } = winston.format;
// Teve que ser refeito o formater individual pq as corzinhas do winston estavam quebrando os .log
export const logger = winston.createLogger({
  level: 'silly',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    align(),
    printf((info: any) => `[${info.timestamp}] ${info.level}: ${info.message}`),
  ),
  transports: [
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }),
        timestamp({
          format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        align(),
        printf(
          (info: any) => `[${info.timestamp}] ${info.level}: ${info.message}`,
        ),
      ),
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: combine(
        timestamp({
          format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        align(),
        printf(
          (info: any) => `[${info.timestamp}] ${info.level}: ${info.message}`,
        ),
      ),
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: combine(
        timestamp({
          format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        align(),
        printf(
          (info: any) => `[${info.timestamp}] ${info.level}: ${info.message}`,
        ),
      ),
    }),
  ],
});
