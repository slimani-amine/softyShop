import { z } from "zod";
declare const createPaymentMethodSchema: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
}, {
    name?: string;
}>;
export default createPaymentMethodSchema;
