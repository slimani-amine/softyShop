import { z } from "zod";
declare const updateStoreSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodUnion<[z.ZodString, z.ZodUndefined]>;
    phoneNumber: z.ZodUnion<[z.ZodString, z.ZodUndefined]>;
    logo: z.ZodUnion<[z.ZodString, z.ZodUndefined]>;
    location: z.ZodUnion<[z.ZodEffects<z.ZodArray<z.ZodNumber, "many">, number[], number[]>, z.ZodUndefined]>;
    address: z.ZodUnion<[z.ZodString, z.ZodUndefined]>;
    socialMediaLinks: z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodUndefined]>;
    vendor_id: z.ZodUnion<[z.ZodString, z.ZodUndefined]>;
}, "strict", z.ZodTypeAny, {
    name?: string;
    phoneNumber?: string;
    logo?: string;
    location?: number[];
    address?: string;
    socialMediaLinks?: string[];
    vendor_id?: string;
}, {
    name?: string;
    phoneNumber?: string;
    logo?: string;
    location?: number[];
    address?: string;
    socialMediaLinks?: string[];
    vendor_id?: string;
}>, {
    name?: string;
    phoneNumber?: string;
    logo?: string;
    location?: number[];
    address?: string;
    socialMediaLinks?: string[];
    vendor_id?: string;
}, {
    name?: string;
    phoneNumber?: string;
    logo?: string;
    location?: number[];
    address?: string;
    socialMediaLinks?: string[];
    vendor_id?: string;
}>;
export default updateStoreSchema;
