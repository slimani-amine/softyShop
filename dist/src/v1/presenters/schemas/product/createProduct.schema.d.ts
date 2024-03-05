import { z } from "zod";
declare const createReviewSchema: z.ZodObject<{
    review: z.ZodString;
    rating: z.ZodNumber;
    userId: z.ZodString;
    productId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    review?: string;
    rating?: number;
    userId?: string;
    productId?: string;
}, {
    review?: string;
    rating?: number;
    userId?: string;
    productId?: string;
}>;
export default createReviewSchema;
