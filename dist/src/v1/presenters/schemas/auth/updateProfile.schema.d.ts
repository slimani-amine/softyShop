import { z } from 'zod';
declare const updateProfileSchema: z.ZodEffects<z.ZodObject<{
    email: z.ZodUnion<[z.ZodString, z.ZodUndefined]>;
    firstName: z.ZodUnion<[z.ZodString, z.ZodUndefined]>;
    lastName: z.ZodUnion<[z.ZodString, z.ZodUndefined]>;
    picture: z.ZodUnion<[z.ZodString, z.ZodUndefined]>;
}, "strict", z.ZodTypeAny, {
    email?: string;
    firstName?: string;
    lastName?: string;
    picture?: string;
}, {
    email?: string;
    firstName?: string;
    lastName?: string;
    picture?: string;
}>, {
    email?: string;
    firstName?: string;
    lastName?: string;
    picture?: string;
}, {
    email?: string;
    firstName?: string;
    lastName?: string;
    picture?: string;
}>;
export default updateProfileSchema;
