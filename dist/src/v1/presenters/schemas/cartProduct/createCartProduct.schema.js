"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createCartProductSchema = zod_1.z.object({
    productId: zod_1.z.string().min(1, {
        message: "Product ID is required",
    }),
    cartId: zod_1.z.string().min(1, {
        message: "Cart ID is required",
    }),
});
exports.default = createCartProductSchema;
//# sourceMappingURL=createCartProduct.schema.js.map