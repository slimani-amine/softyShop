import { z } from "zod";
declare const createPaymentMethodSchema: z.ZodObject<{
    name: z.ZodString;
    icon: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
    icon?: string;
}, {
    name?: string;
    icon?: string;
}>;
export default createPaymentMethodSchema;
