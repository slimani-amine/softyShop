import { z } from "zod";
declare const createAddressSchema: z.ZodObject<{
    address: z.ZodString;
    city: z.ZodString;
    state: z.ZodString;
    zipCode: z.ZodNumber;
    phoneNumber: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    address?: string;
    city?: string;
    state?: string;
    zipCode?: number;
    phoneNumber?: string;
}, {
    address?: string;
    city?: string;
    state?: string;
    zipCode?: number;
    phoneNumber?: string;
}>;
export default createAddressSchema;
