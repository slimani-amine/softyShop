import { z } from "zod";

import {
  FirstNAME_TOO_SHORT_ERROR_MESSAGE,
  INVALID_EMAIL_ERROR_MESSAGE,
  INVALID_PASSWORD_ERROR_MESSAGE,
  LAST_NAME_TOO_SHORT_ERROR_MESSAGE,
  PASSWORDS_DO_NOT_MATCH_ERROR_MESSAGE,
  PASSWORD_TOO_SHORT_ERROR_MESSAGE,
} from "../../../domain/auth/errors";
import { ZodValidationMessageCommon } from "../errors.common";

const registerSchema = z
  .object({
    email: z.string().email({
      message: INVALID_EMAIL_ERROR_MESSAGE,
    }),
    password: z.string().min(8, {
      message: PASSWORD_TOO_SHORT_ERROR_MESSAGE,
    }),
    // .regex(
    //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
    //   INVALID_PASSWORD_ERROR_MESSAGE
    // ),
    verifyPassword: z.string().min(8, {
      message: PASSWORDS_DO_NOT_MATCH_ERROR_MESSAGE,
    }),
    // .regex(
    //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
    //   PASSWORDS_DO_NOT_MATCH_ERROR_MESSAGE
    // )
    picture: z.string(),
    firstName: z.string().min(4, {
      message: FirstNAME_TOO_SHORT_ERROR_MESSAGE,
    }),
    lastName: z.string().min(4, {
      message: LAST_NAME_TOO_SHORT_ERROR_MESSAGE,
    }),
    role: z.enum(
      ["admin", "vendor", "user"],

      {
        errorMap: (issue, ctx) => ({
          message: "role should be admin / vendor or user ",
        }),
      }
    ),
    phoneNumber: z.string(),
  })
  .strict(`${ZodValidationMessageCommon.FIELDS_UNEXPECTED_MESSAGE}`)
  .refine((data) => data.password === data.verifyPassword, {
    message: PASSWORDS_DO_NOT_MATCH_ERROR_MESSAGE,
    path: ["verifyPassword"],
  });

export default registerSchema;
