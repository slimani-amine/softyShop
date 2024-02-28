"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const errors_1 = require("../../../domain/auth/errors");
const errors_common_1 = require("../errors.common");
const verifyAccountSchema = zod_1.z
    .object({
    code: zod_1.z.string().min(1, {
        message: errors_1.INVALID_ACCOUNT_VERIFICATION_CODE_ERROR_MESSAGE,
    }),
})
    .strict(`${errors_common_1.ZodValidationMessageCommon.FIELDS_UNEXPECTED_MESSAGE}`);
exports.default = verifyAccountSchema;
//# sourceMappingURL=verifyAccount.schema.js.map