import { z } from "zod";
declare const updateProfileSchema: z.ZodEffects<z.ZodObject<{
    storeName: z.ZodUnion<[z.ZodString, z.ZodUndefined]>;
    storePhone: z.ZodUnion<[z.ZodString, z.ZodUndefined]>;
    logo: z.ZodUnion<[z.ZodString, z.ZodUndefined]>;
    location: z.ZodEffects<z.ZodArray<z.ZodNumber, "many">, number[], number[]>;
    address: z.ZodUnion<[z.ZodString, z.ZodUndefined]>;
    socialMediaLinks: z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodUndefined]>;
    vendor_id: z.ZodUnion<[z.ZodString, z.ZodUndefined]>;
}, "strict", z.ZodTypeAny, {
    storeName?: string;
    storePhone?: string;
    logo?: string;
    location?: number[];
    address?: string;
    socialMediaLinks?: string[];
    vendor_id?: string;
}, {
    storeName?: string;
    storePhone?: string;
    logo?: string;
    location?: number[];
    address?: string;
    socialMediaLinks?: string[];
    vendor_id?: string;
}>, {
    storeName?: string;
    storePhone?: string;
    logo?: string;
    location?: number[];
    address?: string;
    socialMediaLinks?: string[];
    vendor_id?: string;
}, {
    storeName?: string;
    storePhone?: string;
    logo?: string;
    location?: number[];
    address?: string;
    socialMediaLinks?: string[];
    vendor_id?: string;
}>;
export default updateProfileSchema;
