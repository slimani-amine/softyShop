import { z } from "zod";
declare const createProductCreatorSchema: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
}, {
    name?: string;
}>;
export default createProductCreatorSchema;
