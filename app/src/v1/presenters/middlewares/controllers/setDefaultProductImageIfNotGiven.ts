import { DEFAULT_PRODUCT_IMAGE_LINK } from '../../../../config';
import { Request, Response, NextFunction } from 'express';

export const setDefaultProductImageIfNotGiven =
  (bodyFieldName: string) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.body[bodyFieldName]) {
      req.body[bodyFieldName] = DEFAULT_PRODUCT_IMAGE_LINK;
    }
    next();
  };
