import { z } from "zod";
declare const createCategorySchema: z.ZodObject<{
    name: z.ZodString;
    icon: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
    icon?: string;
}, {
    name?: string;
    icon?: string;
}>;
export default createCategorySchema;
