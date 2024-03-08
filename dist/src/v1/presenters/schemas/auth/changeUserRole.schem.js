"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const errors_common_1 = require("../errors.common");
const UserRoleEnum = zod_1.z.enum(["user", "vendor", "admin"]);
const changeUserRoleSchema = zod_1.z
    .object({
    role: UserRoleEnum,
})
    .strict(`${errors_common_1.ZodValidationMessageCommon.FIELDS_UNEXPECTED_MESSAGE}`)
    .refine((data) => data === null || data === void 0 ? void 0 : data.role, {
    message: "Role must be one of: user, vendor, admin",
});
exports.default = changeUserRoleSchema;
//# sourceMappingURL=changeUserRole.schem.js.map