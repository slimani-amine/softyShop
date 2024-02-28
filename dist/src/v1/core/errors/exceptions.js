"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exceptionService = exports.ExceptionsService = exports.ApiException = void 0;
class ApiException extends Error {
    constructor(payload, status, description) {
        super(payload.message);
        this.status = status;
        this.description = description;
        this.payload = payload;
    }
}
exports.ApiException = ApiException;
class BadRequestException extends ApiException {
    constructor(payload) {
        console.log("🚀 ~ BadRequestException<T ~ constructor ~ payload:", payload);
        super(payload, 400, 'Bad Request');
    }
}
class UnauthorizedExceptionn extends ApiException {
    constructor(payload) {
        super(payload, 401, 'Unauthorized');
    }
}
class NotFoundException extends ApiException {
    constructor(payload) {
        super(payload, 404, 'Not Found');
    }
}
class ForbiddenException extends ApiException {
    constructor(payload) {
        super(payload, 403, 'Not Found');
    }
}
class InternalException extends ApiException {
    constructor(payload) {
        super(payload, 500, 'Internal Server Error');
    }
}
class UnprocessabhleEntityException extends ApiException {
    constructor(payload) {
        super(payload, 422, 'Unprocessable Entity');
    }
}
class ExceptionsService {
    badRequestException(payload) {
        throw new BadRequestException(payload);
    }
    unauthorizedException(payload) {
        throw new UnauthorizedExceptionn(payload);
    }
    notFoundException(payload) {
        throw new NotFoundException(payload);
    }
    forbiddenException(payload) {
        throw new ForbiddenException(payload);
    }
    unprocessabhleEntityException(payload) {
        throw new UnprocessabhleEntityException(payload);
    }
    internalException(payload) {
        throw new InternalException(payload);
    }
}
exports.ExceptionsService = ExceptionsService;
exports.exceptionService = new ExceptionsService();
//# sourceMappingURL=exceptions.js.map