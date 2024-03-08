"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createWishlistSchema = zod_1.z.object({
    productId: zod_1.z.string().min(1, {
        message: "The product ID is required",
    }),
});
exports.default = createWishlistSchema;
//# sourceMappingURL=createWishlist.schema.js.map