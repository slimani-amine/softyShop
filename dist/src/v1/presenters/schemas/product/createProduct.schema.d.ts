import { z } from "zod";
declare const createProductSchema: z.ZodObject<{
    name: z.ZodString;
    price: z.ZodNumber;
    stockNumber: z.ZodNumber;
    isPublished: z.ZodOptional<z.ZodBoolean>;
    brand_id: z.ZodString;
    creator_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
    price?: number;
    stockNumber?: number;
    isPublished?: boolean;
    brand_id?: string;
    creator_id?: string;
}, {
    name?: string;
    price?: number;
    stockNumber?: number;
    isPublished?: boolean;
    brand_id?: string;
    creator_id?: string;
}>;
export default createProductSchema;
