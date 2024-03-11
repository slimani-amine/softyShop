import { z } from "zod";
declare const createReviewSchema: z.ZodObject<{
    review: z.ZodString;
    rating: z.ZodNumber;
    productId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    review?: string;
    rating?: number;
    productId?: string;
}, {
    review?: string;
    rating?: number;
    productId?: string;
}>;
export default createReviewSchema;
