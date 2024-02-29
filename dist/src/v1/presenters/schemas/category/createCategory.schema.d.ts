import { z } from "zod";
declare const createCategorySchema: z.ZodObject<{
    name: z.ZodString;
    icon: z.ZodString;
    productId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
    icon?: string;
    productId?: string;
}, {
    name?: string;
    icon?: string;
    productId?: string;
}>;
export default createCategorySchema;
