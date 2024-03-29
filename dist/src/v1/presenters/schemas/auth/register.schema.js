"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const errors_1 = require("../../../domain/auth/errors");
const errors_common_1 = require("../errors.common");
const registerSchema = zod_1.z
    .object({
    email: zod_1.z.string().email({
        message: errors_1.INVALID_EMAIL_ERROR_MESSAGE,
    }),
    password: zod_1.z.string().min(8, {
        message: errors_1.PASSWORD_TOO_SHORT_ERROR_MESSAGE,
    }),
    verifyPassword: zod_1.z.string().min(8, {
        message: errors_1.PASSWORDS_DO_NOT_MATCH_ERROR_MESSAGE,
    }),
    picture: zod_1.z.string(),
    firstName: zod_1.z.string().min(2, {
        message: errors_1.FirstNAME_TOO_SHORT_ERROR_MESSAGE,
    }),
    lastName: zod_1.z.string().min(2, {
        message: errors_1.LAST_NAME_TOO_SHORT_ERROR_MESSAGE,
    }),
    role: zod_1.z.enum(["admin", "vendor", "user"], {
        errorMap: (issue, ctx) => ({
            message: "role should be admin / vendor or user ",
        }),
    }),
    phoneNumber: zod_1.z.string(),
})
    .strict(`${errors_common_1.ZodValidationMessageCommon.FIELDS_UNEXPECTED_MESSAGE}`)
    .refine((data) => data.password === data.verifyPassword, {
    message: errors_1.PASSWORDS_DO_NOT_MATCH_ERROR_MESSAGE,
    path: ["verifyPassword"],
});
exports.default = registerSchema;
//# sourceMappingURL=register.schema.js.map