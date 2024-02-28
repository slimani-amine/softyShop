import { z } from 'zod';
declare const requestPasswordResetSchema: z.ZodObject<{
    email: z.ZodString;
}, "strict", z.ZodTypeAny, {
    email?: string;
}, {
    email?: string;
}>;
export default requestPasswordResetSchema;
