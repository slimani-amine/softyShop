import { z } from 'zod';
declare const passwordResetSchema: z.ZodObject<{
    token: z.ZodString;
    newPassword: z.ZodString;
}, "strict", z.ZodTypeAny, {
    token?: string;
    newPassword?: string;
}, {
    token?: string;
    newPassword?: string;
}>;
export default passwordResetSchema;
