export interface IExceptionPayload {
    message: string;
}
export declare class ApiException<T extends IExceptionPayload> extends Error {
    readonly status: number;
    readonly description: string;
    readonly payload: T;
    constructor(payload: T, status: number, description: string);
}
export interface IExceptionService {
    badRequestException(payload: any): void;
    unauthorizedException(payload: any): void;
    notFoundException(payload: any): void;
    forbiddenException(payload: any): void;
    internalException(payload: any): void;
    unprocessabhleEntityException(payload: any): void;
}
export declare class ExceptionsService implements IExceptionService {
    badRequestException<T extends IExceptionPayload>(payload: T): void;
    unauthorizedException<T extends IExceptionPayload>(payload: T): void;
    notFoundException<T extends IExceptionPayload>(payload: T): void;
    forbiddenException<T extends IExceptionPayload>(payload: T): void;
    unprocessabhleEntityException<T extends IExceptionPayload>(payload: T): void;
    internalException<T extends IExceptionPayload>(payload: T): void;
}
export declare const exceptionService: ExceptionsService;
