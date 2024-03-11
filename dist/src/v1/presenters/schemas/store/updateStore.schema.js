"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const errors_common_1 = require("../errors.common");
const updateStoreSchema = zod_1.z
    .object({
    name: zod_1.z.union([
        zod_1.z.string().min(2, {
            message: "Store name must be a string with at least 2 characters",
        }),
        zod_1.z.undefined(),
    ]),
    phoneNumber: zod_1.z.union([
        zod_1.z.string().min(8, {
            message: "Store phone must be a string with at least 8 characters",
        }),
        zod_1.z.undefined(),
    ]),
    logo: zod_1.z.union([
        zod_1.z.string().min(2, {
            message: "Store logo must be a string with at least 2 characters",
        }),
        zod_1.z.undefined(),
    ]),
    location: zod_1.z.union([
        zod_1.z.array(zod_1.z.number()).refine((data) => data.length === 2, {
            message: "Store location must contain exactly two numbers",
        }),
        zod_1.z.undefined(),
    ]),
    address: zod_1.z.union([
        zod_1.z.string().min(4, {
            message: "Store address must be a string with at least 4 characters",
        }),
        zod_1.z.undefined(),
    ]),
    socialMediaLinks: zod_1.z.union([zod_1.z.array(zod_1.z.string()), zod_1.z.undefined()]),
    vendor_id: zod_1.z.union([
        zod_1.z.string().min(1, {
            message: "Vendor ID must be a string with at least 1 character",
        }),
        zod_1.z.undefined(),
    ]),
})
    .strict(`${errors_common_1.ZodValidationMessageCommon.FIELDS_UNEXPECTED_MESSAGE}`)
    .refine((data) => (data === null || data === void 0 ? void 0 : data.name) ||
    (data === null || data === void 0 ? void 0 : data.phoneNumber) ||
    (data === null || data === void 0 ? void 0 : data.logo) ||
    (data === null || data === void 0 ? void 0 : data.location) ||
    (data === null || data === void 0 ? void 0 : data.socialMediaLinks) ||
    (data === null || data === void 0 ? void 0 : data.vendor_id), {
    message: "At least one field should be provided for updating the profile",
});
exports.default = updateStoreSchema;
//# sourceMappingURL=updateStore.schema.js.map