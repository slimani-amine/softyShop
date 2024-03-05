"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createReviewSchema = zod_1.z.object({
    review: zod_1.z.string().min(1, {
        message: "The review content is required",
    }),
    rating: zod_1.z.number().min(0).max(5, {
        message: "The rating should be between 0 and 5",
    }),
    userId: zod_1.z.string().min(1, {
        message: "The user ID is required",
    }),
    productId: zod_1.z.string().min(1, {
        message: "The product ID is required",
    }),
});
exports.default = createReviewSchema;
//# sourceMappingURL=createProduct.schema.js.map