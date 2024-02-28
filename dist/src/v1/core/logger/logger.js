"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.logger = void 0;
const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const colors = require("colors");
class Logger {
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
                    format: winston.format.combine(winston.format.errors({ stack: true }), winston.format.colorize({ all: true }), winston.format.json(), winston.format.label({ label: 'LOGGER' }), winston.format.timestamp(), winston.format.printf(({ level, message, label, timestamp, stack }) => {
                        if (!stack) {
                            return `${colors.magenta.bold(timestamp)} [${colors.bold.bgWhite.black(label)}] ${colors.bold(level)}: ${colors.blue.bold(message)}`;
                        }
                        else
                            return `${colors.magenta(timestamp)} [${colors.bgWhite.black(label)}] ${colors.bold(level)}: ${colors.red(message)}\n  ${stack}`;
                    })),
                }),
                new DailyRotateFile({
                    level: 'error',
                    dirname: 'logs',
                    filename: 'errors-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '10d',
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
    debug(context, message) {
        if (process.env.NODE_ENV !== 'production') {
            this._winstonLogger.log({ level: 'debug', message: `[${context}] ${message}` });
        }
    }
    log(context, message) {
        if (process.env.NODE_ENV === 'production') {
            this._winstonLogger.warn(`[${context}] ${message}`);
        }
        else
            this._winstonLogger.info(`[${context}] ${message}`);
    }
    error(context, message, trace) {
        this._winstonLogger.error({ level: 'error', message: `[${context}] ${message}`, trace: trace });
    }
    warn(context, message) {
        this._winstonLogger.warn(`[${context}] ${message}`);
    }
    verbose(context, message) {
        if (process.env.NODE_ENV !== 'production') {
            this._winstonLogger.verbose(`[${context}] ${message}`);
        }
    }
}
exports.Logger = Logger;
const logger = new Logger();
exports.logger = logger;
//# sourceMappingURL=logger.js.map