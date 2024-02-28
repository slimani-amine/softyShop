import { ZodError, ZodSchema } from 'zod';
import { exceptionService } from '../../core/errors/exceptions';
import { ZODERROR_CODES } from '../../presenters/middlewares/schemas/validateSchema.middleware';

export const VALIDATION_ERROR_MESSAGE = 'Validation Error';
export const INTERNAL_SERVER_ERROR_MESSAGE = 'Server Error';

export const trimAndValidateSchemaPayload = <T>(schema: ZodSchema, payload: T) => {
  const trimmedPayload = trimStringValues<T>(payload);
  validatePayloadSchema<T>(schema, trimmedPayload);
  return trimmedPayload;
};

export const trimStringValues = <T>(data: T) => {
  return Object.entries(data).reduce((acc, [key, value]) => {
    acc[key] = typeof value === 'string' ? value?.trim() : value;
    return acc;
  }, {} as T);
};
export const validatePayloadSchema = <T>(schema: ZodSchema, payload: T) => {
  try {
    schema.parse(payload) as any;
  } catch (err: any) {
    if (err instanceof ZodError) {
      const errorsPayload = {};

      err.errors.forEach((element: any) => {
        if (element?.code === ZODERROR_CODES.UNRECOGNIZED_KEYS) {
          element.keys?.forEach((el: string) => {
            errorsPayload[el] = `${el} is not allowed!`;
          });
        } else {
          errorsPayload[element.path ? element.path[0] : element?.validation || 'error'] =
            element.message;
        }
      });
      exceptionService.unprocessabhleEntityException({
        message: VALIDATION_ERROR_MESSAGE,
        errors: errorsPayload,
      });
      return errorsPayload;
    }
    exceptionService.internalException({
      message: INTERNAL_SERVER_ERROR_MESSAGE,
    });
  }
};
