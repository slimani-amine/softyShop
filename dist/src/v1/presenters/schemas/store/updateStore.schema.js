"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const errors_common_1 = require("../errors.common");
const updateProfileSchema = zod_1.z
    .object({
    storeName: zod_1.z.union([
        zod_1.z.string().email({
            message: "Le nom du boutique string",
        }),
        zod_1.z.undefined(),
    ]),
    storePhone: zod_1.z.union([
        zod_1.z.string().min(2, {
            message: "Le telephone du boutique string (8 chiffres)",
        }),
        zod_1.z.undefined(),
    ]),
    logo: zod_1.z.union([
        zod_1.z.string().min(2, {
            message: "Le logo du boutique string",
        }),
        zod_1.z.undefined(),
    ]),
    location: zod_1.z.array(zod_1.z.number()).refine((data) => data.length === 2, {
        message: "La location du boutique string et doit contenir exactement deux nombres",
    }),
    address: zod_1.z.union([
        zod_1.z.string().min(4, {
            message: "L'address' du boutique string",
        }),
        zod_1.z.undefined(),
    ]),
    socialMediaLinks: zod_1.z.union([zod_1.z.array(zod_1.z.string()), zod_1.z.undefined()]),
    vendor_id: zod_1.z.union([
        zod_1.z.string().min(1, {
            message: "L'utilisateur du boutique string",
        }),
        zod_1.z.undefined(),
    ]),
})
    .strict(`${errors_common_1.ZodValidationMessageCommon.FIELDS_UNEXPECTED_MESSAGE}`)
    .refine((data) => (data === null || data === void 0 ? void 0 : data.storeName) ||
    (data === null || data === void 0 ? void 0 : data.storePhone) ||
    (data === null || data === void 0 ? void 0 : data.logo) ||
    (data === null || data === void 0 ? void 0 : data.location) ||
    (data === null || data === void 0 ? void 0 : data.socialMediaLinks) ||
    (data === null || data === void 0 ? void 0 : data.vendor_id));
exports.default = updateProfileSchema;
//# sourceMappingURL=updateStore.schema.js.map