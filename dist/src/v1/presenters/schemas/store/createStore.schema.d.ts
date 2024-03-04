import { z } from "zod";
declare const createStoreSchema: z.ZodObject<{
    storeName: z.ZodString;
    storePhone: z.ZodString;
    logo: z.ZodString;
    isPublished: z.ZodOptional<z.ZodBoolean>;
    position: z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>;
    socialMediaLinks: z.ZodArray<z.ZodString, "many">;
    vendor_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    storeName?: string;
    storePhone?: string;
    logo?: string;
    isPublished?: boolean;
    position?: string[];
    socialMediaLinks?: string[];
    vendor_id?: string;
}, {
    storeName?: string;
    storePhone?: string;
    logo?: string;
    isPublished?: boolean;
    position?: string[];
    socialMediaLinks?: string[];
    vendor_id?: string;
}>;
export default createStoreSchema;
