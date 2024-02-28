import { z } from 'zod';
declare const createStoreSchema: z.ZodObject<{
    storeName: z.ZodString;
    logo: z.ZodString;
    foundedAt: z.ZodString;
    isPublished: z.ZodBoolean;
    position: z.ZodString;
    socialMediaLinks: z.ZodString;
    vendor_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    storeName?: string;
    logo?: string;
    foundedAt?: string;
    isPublished?: boolean;
    position?: string;
    socialMediaLinks?: string;
    vendor_id?: string;
}, {
    storeName?: string;
    logo?: string;
    foundedAt?: string;
    isPublished?: boolean;
    position?: string;
    socialMediaLinks?: string;
    vendor_id?: string;
}>;
export default createStoreSchema;
