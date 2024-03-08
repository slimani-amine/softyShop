import { z } from "zod";
import { ZodValidationMessageCommon } from "../errors.common";

const UserRoleEnum = z.enum(["user", "vendor", "admin"]);

const changeUserRoleSchema = z
  .object({
    role: UserRoleEnum,
  })
  .strict(`${ZodValidationMessageCommon.FIELDS_UNEXPECTED_MESSAGE}`)
  .refine((data) => data?.role, {
    message: "Role must be one of: user, vendor, admin",
  });

export default changeUserRoleSchema;
