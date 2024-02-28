"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const errors_1 = require("../../../domain/auth/errors");
const errors_common_1 = require("../errors.common");
const loginSchema = zod_1.z
    .object({
    email: zod_1.z.string().email({
        message: errors_1.INVALID_EMAIL_ERROR_MESSAGE,
    }),
    password: zod_1.z.string().min(8, {
        message: errors_1.INVALID_PASSWORD_ERROR_MESSAGE,
    }),
})
    .strict(`${errors_common_1.ZodValidationMessageCommon.FIELDS_UNEXPECTED_MESSAGE}`);
exports.default = loginSchema;
//# sourceMappingURL=login.schema.js.map