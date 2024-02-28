import { z } from 'zod';
import {
  INVALID_EMAIL_ERROR_MESSAGE,
  INVALID_PASSWORD_ERROR_MESSAGE,
} from '../../../domain/auth/errors';
import { ZodValidationMessageCommon } from '../errors.common';

const loginSchema = z
  .object({
    email: z.string().email({
      message: INVALID_EMAIL_ERROR_MESSAGE,
    }),
    password: z.string().min(8, {
      message: INVALID_PASSWORD_ERROR_MESSAGE,
    }),
  })
  .strict(`${ZodValidationMessageCommon.FIELDS_UNEXPECTED_MESSAGE}`);

export default loginSchema;
