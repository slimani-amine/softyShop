import { z } from "zod";
declare const changeUserRoleSchema: z.ZodEffects<z.ZodObject<{
    role: z.ZodEnum<["user", "vendor", "admin"]>;
}, "strict", z.ZodTypeAny, {
    role?: "user" | "admin" | "vendor";
}, {
    role?: "user" | "admin" | "vendor";
}>, {
    role?: "user" | "admin" | "vendor";
}, {
    role?: "user" | "admin" | "vendor";
}>;
export default changeUserRoleSchema;
