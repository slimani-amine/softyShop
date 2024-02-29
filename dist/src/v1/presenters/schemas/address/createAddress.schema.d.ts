import { z } from "zod";
declare const createAddressSchema: z.ZodObject<{
    address: z.ZodString;
    city: z.ZodString;
    state: z.ZodString;
    zipCode: z.ZodNumber;
    user_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    address?: string;
    city?: string;
    state?: string;
    zipCode?: number;
    user_id?: string;
}, {
    address?: string;
    city?: string;
    state?: string;
    zipCode?: number;
    user_id?: string;
}>;
export default createAddressSchema;
