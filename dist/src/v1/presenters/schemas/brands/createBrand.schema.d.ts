import { z } from "zod";
declare const createBrandSchema: z.ZodObject<{
    name: z.ZodString;
    logo: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
    logo?: string;
}, {
    name?: string;
    logo?: string;
}>;
export default createBrandSchema;
