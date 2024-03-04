export interface IExceptionPayload {
  message: string;
}
export class ApiException<T extends IExceptionPayload> extends Error {
  readonly status: number;
  readonly description: string;
  readonly payload: T;
  constructor(payload: T, status: number, description: string) {
    super(payload.message);
    this.status = status;
    this.description = description;
    this.payload = payload;
  }
}
class BadRequestException<T extends IExceptionPayload> extends ApiException<T> {
  constructor(payload: any) {
    super(payload, 400, 'Bad Request');
  }
}
class UnauthorizedExceptionn<T extends IExceptionPayload> extends ApiException<T> {
  constructor(payload: any) {
    super(payload, 401, 'Unauthorized');
  }
}
class NotFoundException<T extends IExceptionPayload> extends ApiException<T> {
  constructor(payload: any) {
    super(payload, 404, 'Not Found');
  }
}
class ForbiddenException<T extends IExceptionPayload> extends ApiException<T> {
  constructor(payload: any) {
    super(payload, 403, 'Not Found');
  }
}
class InternalException<T extends IExceptionPayload> extends ApiException<T> {
  constructor(payload: any) {
    super(payload, 500, 'Internal Server Error');
  }
}
class UnprocessabhleEntityException<T extends IExceptionPayload> extends ApiException<T> {
  constructor(payload: any) {
    super(payload, 422, 'Unprocessable Entity');
  }
}
export interface IExceptionService {
  badRequestException(payload: any): void;
  unauthorizedException(payload: any): void;
  notFoundException(payload: any): void;
  forbiddenException(payload: any): void;
  internalException(payload: any): void;
  unprocessabhleEntityException(payload: any): void;
}
export class ExceptionsService implements IExceptionService {
  badRequestException<T extends IExceptionPayload>(payload: T): void {
    throw new BadRequestException(payload);
  }
  unauthorizedException<T extends IExceptionPayload>(payload: T): void {
    throw new UnauthorizedExceptionn(payload);
  }
  notFoundException<T extends IExceptionPayload>(payload: T): void {
    throw new NotFoundException(payload);
  }
  forbiddenException<T extends IExceptionPayload>(payload: T): void {
    throw new ForbiddenException(payload);
  }
  unprocessabhleEntityException<T extends IExceptionPayload>(payload: T): void {
    throw new UnprocessabhleEntityException(payload);
  }
  internalException<T extends IExceptionPayload>(payload: T): void {
    throw new InternalException(payload);
  }
}

export const exceptionService = new ExceptionsService();
