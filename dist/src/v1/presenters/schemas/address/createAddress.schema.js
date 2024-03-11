"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createAddressSchema = zod_1.z.object({
    address: zod_1.z.string().min(1, {
        message: "The address is required",
    }),
    city: zod_1.z.string().min(1, {
        message: "The city is required",
    }),
    state: zod_1.z.string().min(1, {
        message: "The state is required",
    }),
    zipCode: zod_1.z.number(),
    phoneNumber: zod_1.z
        .string()
        .min(8, {
        message: "The phone number 8 numbers",
    })
        .max(8, {
        message: "The phone number 8 numbers",
    })
        .optional(),
});
exports.default = createAddressSchema;
//# sourceMappingURL=createAddress.schema.js.map