import { z } from 'zod';
import { INVALID_EMAIL_ERROR_MESSAGE } from '../../../domain/auth/errors';
import { ZodValidationMessageCommon } from '../errors.common';

const requestPasswordResetSchema = z
  .object({
    email: z.string().email({
      message: INVALID_EMAIL_ERROR_MESSAGE,
    }),
  })
  .strict(`${ZodValidationMessageCommon.FIELDS_UNEXPECTED_MESSAGE}`);

export default requestPasswordResetSchema;
