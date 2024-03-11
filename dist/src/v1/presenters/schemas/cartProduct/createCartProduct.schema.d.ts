import { z } from "zod";
declare const createCartProductSchema: z.ZodObject<{
    productId: z.ZodString;
    quantity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    productId?: string;
    quantity?: number;
}, {
    productId?: string;
    quantity?: number;
}>;
export default createCartProductSchema;
