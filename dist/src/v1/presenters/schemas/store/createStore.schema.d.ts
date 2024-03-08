import { z } from "zod";
declare const createStoreSchema: z.ZodObject<{
    storeName: z.ZodString;
    storePhone: z.ZodString;
    logo: z.ZodString;
    isPublished: z.ZodOptional<z.ZodBoolean>;
    location: z.ZodEffects<z.ZodArray<z.ZodNumber, "many">, number[], number[]>;
    address: z.ZodString;
    socialMediaLinks: z.ZodArray<z.ZodString, "many">;
    vendor_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    storeName?: string;
    storePhone?: string;
    logo?: string;
    isPublished?: boolean;
    location?: number[];
    address?: string;
    socialMediaLinks?: string[];
    vendor_id?: string;
}, {
    storeName?: string;
    storePhone?: string;
    logo?: string;
    isPublished?: boolean;
    location?: number[];
    address?: string;
    socialMediaLinks?: string[];
    vendor_id?: string;
}>;
export default createStoreSchema;
