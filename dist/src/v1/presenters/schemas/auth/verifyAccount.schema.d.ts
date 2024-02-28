import { z } from 'zod';
declare const verifyAccountSchema: z.ZodObject<{
    code: z.ZodString;
}, "strict", z.ZodTypeAny, {
    code?: string;
}, {
    code?: string;
}>;
export default verifyAccountSchema;
