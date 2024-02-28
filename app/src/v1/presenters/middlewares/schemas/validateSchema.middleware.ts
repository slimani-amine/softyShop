import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema, z } from 'zod';
import { exceptionService } from '../../../core/errors/exceptions';
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
} from '../../../utils/validation/validate.schema';

export enum ZODERROR_CODES {
  UNRECOGNIZED_KEYS = 'unrecognized_keys',
}
export enum VALIDATION_PATHS {
  BODY = 'body',
  PARAMS = 'params',
  HEADERS = 'headers',
  QUERY = 'query',
  COOKIES = 'cookies',
}
export const validateSchemaMiddleware =
  (schema: ZodSchema, validationPath: VALIDATION_PATHS = VALIDATION_PATHS.BODY) =>
  (req: Request, Res: Response, next: NextFunction) => {
    try {
      schema.parse(req[validationPath]) as any;
      next();
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

export const ZodIdValidator = (idName: string) => {
  return z.object({
    [idName]: z.string().regex(/^[1-9]\d*$$/),
  });
};
