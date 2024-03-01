"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createBrandSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, {
        message: "The name of the brand is required",
    }),
    logo: zod_1.z.string().min(1, {
        message: "The logo of the brand is required",
    }),
    productId: zod_1.z.number().min(1, {
        message: "The product ID is required",
    }),
});
exports.default = createBrandSchema;
//# sourceMappingURL=createBrand.schema.js.map