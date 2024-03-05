"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, {
        message: "The name of the product is required",
    }),
    price: zod_1.z.number().min(0, {
        message: "The price of the product should be greater than or equal to 0",
    }),
    stockNumber: zod_1.z.number().min(0, {
        message: "The stock number of the product should be greater than or equal to 0",
    }),
    isPublished: zod_1.z.boolean().optional(),
    brand_id: zod_1.z.string().min(1, {
        message: "The brand of the product is required",
    }),
    creator_id: zod_1.z.string().min(1, {
        message: "The creator of the product is required",
    }),
});
exports.default = createProductSchema;
//# sourceMappingURL=createProduct.schema.js.map