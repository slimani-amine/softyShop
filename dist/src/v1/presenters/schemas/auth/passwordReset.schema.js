"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const errors_1 = require("../../../domain/auth/errors");
const errors_common_1 = require("../errors.common");
const passwordResetSchema = zod_1.z
    .object({
    token: zod_1.z.string().min(1, {
        message: 'veuillez vérifier le jeton',
    }),
    newPassword: zod_1.z
        .string()
        .min(8, {
        message: errors_1.PASSWORD_TOO_SHORT_ERROR_MESSAGE,
    })
        .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/, errors_1.INVALID_PASSWORD_ERROR_MESSAGE),
})
    .strict(`${errors_common_1.ZodValidationMessageCommon.FIELDS_UNEXPECTED_MESSAGE}`);
exports.default = passwordResetSchema;
//# sourceMappingURL=passwordReset.schema.js.map