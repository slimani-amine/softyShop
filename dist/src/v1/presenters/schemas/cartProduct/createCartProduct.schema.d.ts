import { z } from "zod";
declare const createCartProductSchema: z.ZodObject<{
    productId: z.ZodString;
    cartId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    productId?: string;
    cartId?: string;
}, {
    productId?: string;
    cartId?: string;
}>;
export default createCartProductSchema;
