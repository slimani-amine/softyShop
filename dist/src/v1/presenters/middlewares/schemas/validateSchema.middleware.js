"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodIdValidator = exports.validateSchemaMiddleware = exports.VALIDATION_PATHS = exports.ZODERROR_CODES = void 0;
const zod_1 = require("zod");
const exceptions_1 = require("../../../core/errors/exceptions");
const validate_schema_1 = require("../../../utils/validation/validate.schema");
var ZODERROR_CODES;
(function (ZODERROR_CODES) {
    ZODERROR_CODES["UNRECOGNIZED_KEYS"] = "unrecognized_keys";
})(ZODERROR_CODES || (exports.ZODERROR_CODES = ZODERROR_CODES = {}));
var VALIDATION_PATHS;
(function (VALIDATION_PATHS) {
    VALIDATION_PATHS["BODY"] = "body";
    VALIDATION_PATHS["PARAMS"] = "params";
    VALIDATION_PATHS["HEADERS"] = "headers";
    VALIDATION_PATHS["QUERY"] = "query";
    VALIDATION_PATHS["COOKIES"] = "cookies";
})(VALIDATION_PATHS || (exports.VALIDATION_PATHS = VALIDATION_PATHS = {}));
const validateSchemaMiddleware = (schema, validationPath = VALIDATION_PATHS.BODY) => (req, Res, next) => {
    try {
        schema.parse(req[validationPath]);
        next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            const errorsPayload = {};
            err.errors.forEach((element) => {
                var _a;
                if ((element === null || element === void 0 ? void 0 : element.code) === ZODERROR_CODES.UNRECOGNIZED_KEYS) {
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
                message: validate_schema_1.VALIDATION_ERROR_MESSAGE,
                errors: errorsPayload,
            });
            return errorsPayload;
        }
        exceptions_1.exceptionService.internalException({
            message: validate_schema_1.INTERNAL_SERVER_ERROR_MESSAGE,
        });
    }
};
exports.validateSchemaMiddleware = validateSchemaMiddleware;
const ZodIdValidator = (idName) => {
    return zod_1.z.object({
        [idName]: zod_1.z.string().regex(/^[1-9]\d*$$/),
    });
};
exports.ZodIdValidator = ZodIdValidator;
//# sourceMappingURL=validateSchema.middleware.js.map