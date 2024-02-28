"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePayloadSchema = exports.trimStringValues = exports.trimAndValidateSchemaPayload = exports.INTERNAL_SERVER_ERROR_MESSAGE = exports.VALIDATION_ERROR_MESSAGE = void 0;
const zod_1 = require("zod");
const exceptions_1 = require("../../core/errors/exceptions");
const validateSchema_middleware_1 = require("../../presenters/middlewares/schemas/validateSchema.middleware");
exports.VALIDATION_ERROR_MESSAGE = 'Validation Error';
exports.INTERNAL_SERVER_ERROR_MESSAGE = 'Server Error';
const trimAndValidateSchemaPayload = (schema, payload) => {
    const trimmedPayload = (0, exports.trimStringValues)(payload);
    (0, exports.validatePayloadSchema)(schema, trimmedPayload);
    return trimmedPayload;
};
exports.trimAndValidateSchemaPayload = trimAndValidateSchemaPayload;
const trimStringValues = (data) => {
    return Object.entries(data).reduce((acc, [key, value]) => {
        acc[key] = typeof value === 'string' ? value === null || value === void 0 ? void 0 : value.trim() : value;
        return acc;
    }, {});
};
exports.trimStringValues = trimStringValues;
const validatePayloadSchema = (schema, payload) => {
    try {
        schema.parse(payload);
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            const errorsPayload = {};
            err.errors.forEach((element) => {
                var _a;
                if ((element === null || element === void 0 ? void 0 : element.code) === validateSchema_middleware_1.ZODERROR_CODES.UNRECOGNIZED_KEYS) {
                    (_a = element.keys) === null || _a === void 0 ? void 0 : _a.forEach((el) => {
                        errorsPayload[el] = `${el} is not allowed!`;
                    });
                }
                else {
                    errorsPayload[element.path ? element.path[0] : (element === null || element === void 0 ? void 0 : element.validation) || 'error'] =
                        element.message;
                }
            });
            exceptions_1.exceptionService.unprocessabhleEntityException({
                message: exports.VALIDATION_ERROR_MESSAGE,
                errors: errorsPayload,
            });
            return errorsPayload;
        }
        exceptions_1.exceptionService.internalException({
            message: exports.INTERNAL_SERVER_ERROR_MESSAGE,
        });
    }
};
exports.validatePayloadSchema = validatePayloadSchema;
//# sourceMappingURL=validate.schema.js.map