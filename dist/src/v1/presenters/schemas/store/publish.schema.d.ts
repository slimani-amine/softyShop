import { z } from "zod";
declare const publishStoreSchema: z.ZodObject<{
    isPublished: z.ZodEffects<z.ZodBoolean, boolean, boolean>;
}, "strict", z.ZodTypeAny, {
    isPublished?: boolean;
}, {
    isPublished?: boolean;
}>;
export default publishStoreSchema;
