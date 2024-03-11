import { z } from "zod";
declare const createStoreSchema: z.ZodObject<{
    name: z.ZodString;
    phoneNumber: z.ZodString;
    logo: z.ZodString;
    isPublished: z.ZodOptional<z.ZodBoolean>;
    location: z.ZodEffects<z.ZodArray<z.ZodNumber, "many">, number[], number[]>;
    address: z.ZodString;
    socialMediaLinks: z.ZodArray<z.ZodString, "many">;
    vendor_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
    phoneNumber?: string;
    logo?: string;
    isPublished?: boolean;
    location?: number[];
    address?: string;
    socialMediaLinks?: string[];
    vendor_id?: string;
}, {
    name?: string;
    phoneNumber?: string;
    logo?: string;
    isPublished?: boolean;
    location?: number[];
    address?: string;
    socialMediaLinks?: string[];
    vendor_id?: string;
}>;
export default createStoreSchema;
