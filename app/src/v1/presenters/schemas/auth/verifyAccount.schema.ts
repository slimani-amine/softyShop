import { z } from 'zod';
import { INVALID_ACCOUNT_VERIFICATION_CODE_ERROR_MESSAGE } from '../../../domain/auth/errors';
import { ZodValidationMessageCommon } from '../errors.common';

const verifyAccountSchema = z
  .object({
    code: z.string().min(1, {
      message: INVALID_ACCOUNT_VERIFICATION_CODE_ERROR_MESSAGE,
    }),
  })
  .strict(`${ZodValidationMessageCommon.FIELDS_UNEXPECTED_MESSAGE}`);

export default verifyAccountSchema;
