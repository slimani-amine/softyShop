import { z } from "zod";
declare const createBrandSchema: z.ZodObject<{
    name: z.ZodString;
    logo: z.ZodString;
    productId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name?: string;
    logo?: string;
    productId?: number;
}, {
    name?: string;
    logo?: string;
    productId?: number;
}>;
export default createBrandSchema;
