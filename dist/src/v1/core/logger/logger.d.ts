interface ILogger {
    debug(context: string, message: string | object): void;
    log(context: string, message: string | object): void;
    error(context: string, message: string | object, trace?: string): void;
    warn(context: string, message: string | object): void;
    verbose(context: string, message: string | object): void;
}
declare class Logger implements ILogger {
    private _winstonLogger;
    constructor();
    debug(context: string, message: string): void;
    log(context: string, message: string): void;
    error(context: string, message: string, trace?: string): void;
    warn(context: string, message: string): void;
    verbose(context: string, message: string): void;
}
declare const logger: Logger;
export { logger, Logger, ILogger };
