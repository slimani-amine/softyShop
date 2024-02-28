import { z } from 'zod';
declare const registerSchema: z.ZodEffects<z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    verifyPassword: z.ZodString;
    picture: z.ZodString;
    username: z.ZodString;
    role: z.ZodEnum<["admin", "vendor", "user"]>;
    phoneNumber: z.ZodString;
}, "strict", z.ZodTypeAny, {
    email?: string;
    password?: string;
    verifyPassword?: string;
    picture?: string;
    username?: string;
    role?: "user" | "admin" | "vendor";
    phoneNumber?: string;
}, {
    email?: string;
    password?: string;
    verifyPassword?: string;
    picture?: string;
    username?: string;
    role?: "user" | "admin" | "vendor";
    phoneNumber?: string;
}>, {
    email?: string;
    password?: string;
    verifyPassword?: string;
    picture?: string;
    username?: string;
    role?: "user" | "admin" | "vendor";
    phoneNumber?: string;
}, {
    email?: string;
    password?: string;
    verifyPassword?: string;
    picture?: string;
    username?: string;
    role?: "user" | "admin" | "vendor";
    phoneNumber?: string;
}>;
export default registerSchema;
