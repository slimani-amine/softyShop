import { z } from "zod";
declare const createWishlistSchema: z.ZodObject<{
    productId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    productId?: string;
}, {
    productId?: string;
}>;
export default createWishlistSchema;
