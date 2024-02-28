import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as colors from 'colors';
interface ILogger {
  debug(context: string, message: string | object): void;
  log(context: string, message: string | object): void;
  error(context: string, message: string | object, trace?: string): void;
  warn(context: string, message: string | object): void;
  verbose(context: string, message: string | object): void;
}
class Logger implements ILogger {
  private _winstonLogger: winston.Logger;
  constructor() {
    winston.addColors({
      error: 'red',
      warn: 'yellow',
      info: 'green',
      debug: 'blue',
      verbose: 'cyan',
    });

    this._winstonLogger = winston.createLogger({
      transports: [
        new winston.transports.Console({
          level: 'debug',
          format: winston.format.combine(
            winston.format.errors({ stack: true }),
            winston.format.colorize({ all: true }),
            winston.format.json(),
            winston.format.label({ label: 'LOGGER' }),
            winston.format.timestamp(),
            winston.format.printf(({ level, message, label, timestamp, stack }) => {
              if (!stack) {
                return `${colors.magenta.bold(timestamp)} [${colors.bold.bgWhite.black(
                  label,
                )}] ${colors.bold(level)}: ${colors.blue.bold(message)}`;
              } else
                return `${colors.magenta(timestamp)} [${colors.bgWhite.black(label)}] ${colors.bold(
                  level,
                )}: ${colors.red(message)}\n  ${stack}`;
            }),
          ),
        }),
        new DailyRotateFile({
          level: 'error',
          dirname: 'logs', // Directory to store the log files.
          filename: 'errors-%DATE%.log', // File name pattern with date placeholders.
          datePattern: 'YYYY-MM-DD', // Date format to use in the file name.
          zippedArchive: true, // Compress the rotated files.
          maxSize: '20m', // Maximum size of each log file.
          maxFiles: '10d', // Maximum number of days to keep the log files.
        }),
        new DailyRotateFile({
          level: 'info',
          dirname: 'logs',
          filename: 'info-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '10d',
        }),
        new DailyRotateFile({
          level: 'warn',
          dirname: 'logs',
          filename: 'warn-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '10d',
        }),
        new DailyRotateFile({
          level: 'debug',
          dirname: 'logs',
          filename: 'debug-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '10d',
        }),
        new DailyRotateFile({
          level: 'verbose',
          dirname: 'logs',
          filename: 'verbose-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '10d',
        }),
      ],
    });
  }
  debug(context: string, message: string) {
    if (process.env.NODE_ENV !== 'production') {
      this._winstonLogger.log({ level: 'debug', message: `[${context}] ${message}` });
    }
  }
  log(context: string, message: string) {
    if (process.env.NODE_ENV === 'production') {
      this._winstonLogger.warn(`[${context}] ${message}`);
    } else this._winstonLogger.info(`[${context}] ${message}`);
  }
  error(context: string, message: string, trace?: string) {
    this._winstonLogger.error({ level: 'error', message: `[${context}] ${message}`, trace: trace });
  }
  warn(context: string, message: string) {
    this._winstonLogger.warn(`[${context}] ${message}`);
  }
  verbose(context: string, message: string) {
    if (process.env.NODE_ENV !== 'production') {
      this._winstonLogger.verbose(`[${context}] ${message}`);
    }
  }
}
const logger = new Logger();

export { logger, Logger, ILogger };
