import { z } from 'zod';
import {
  INVALID_PASSWORD_ERROR_MESSAGE,
  PASSWORD_TOO_SHORT_ERROR_MESSAGE,
} from '../../../domain/auth/errors';
import { ZodValidationMessageCommon } from '../errors.common';

const passwordResetSchema = z
  .object({
    token: z.string().min(1, {
      message: 'veuillez vérifier le jeton',
    }),
    newPassword: z
      .string()
      .min(8, {
        message: PASSWORD_TOO_SHORT_ERROR_MESSAGE,
      })
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
        INVALID_PASSWORD_ERROR_MESSAGE,
      ),
  })
  .strict(`${ZodValidationMessageCommon.FIELDS_UNEXPECTED_MESSAGE}`);

export default passwordResetSchema;
