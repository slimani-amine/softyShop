"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorMiddleware = exports.createHandleErrorMiddleware = void 0;
const typeorm_1 = require("typeorm");
const exceptions_1 = require("../../../core/errors/exceptions");
const logger_1 = require("../../../core/logger/logger");
const validate_schema_1 = require("../../../utils/validation/validate.schema");
const createHandleErrorMiddleware = () => (err, req, res, next) => {
    logger_1.logger.error('ERROR', err.message, err.stack);
    if (err instanceof exceptions_1.ApiException) {
        logger_1.logger.error('ERROR', err.message);
        return res.status(err.status).json(Object.assign({ error: err.description, message: err.message }, err.payload));
    }
    if (err instanceof typeorm_1.TypeORMError) {
        const ormError = err;
        if (ormError.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                error: validate_schema_1.VALIDATION_ERROR_MESSAGE,
                message: 'Cette entité existe déjà.',
            });
        }
    }
    return res.status(500).json({
        error: validate_schema_1.INTERNAL_SERVER_ERROR_MESSAGE,
        message: 'erreur serveur',
    });
    next();
};
exports.createHandleErrorMiddleware = createHandleErrorMiddleware;
exports.handleErrorMiddleware = (0, exports.createHandleErrorMiddleware)();
//# sourceMappingURL=handleError.middleware.js.map