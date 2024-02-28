"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const errors_1 = require("../../../domain/auth/errors");
const errors_common_1 = require("../errors.common");
const updateProfileSchema = zod_1.z
    .object({
    email: zod_1.z.union([
        zod_1.z.string().email({
            message: errors_1.INVALID_EMAIL_ERROR_MESSAGE,
        }),
        zod_1.z.undefined(),
    ]),
    firstName: zod_1.z.union([
        zod_1.z.string().min(2, {
            message: errors_1.FIRST_NAME_TOO_SHORT_ERROR_MESSAGE,
        }),
        zod_1.z.undefined(),
    ]),
    lastName: zod_1.z.union([
        zod_1.z.string().min(2, {
            message: errors_1.LAST_NAME_TOO_SHORT_ERROR_MESSAGE,
        }),
        zod_1.z.undefined(),
    ]),
    picture: zod_1.z.union([zod_1.z.string(), zod_1.z.undefined()]),
})
    .strict(`${errors_common_1.ZodValidationMessageCommon.FIELDS_UNEXPECTED_MESSAGE}`)
    .refine((data) => (data === null || data === void 0 ? void 0 : data.email) || (data === null || data === void 0 ? void 0 : data.firstName) || (data === null || data === void 0 ? void 0 : data.lastName) || (data === null || data === void 0 ? void 0 : data.picture));
exports.default = updateProfileSchema;
//# sourceMappingURL=updateProfile.schema.js.map