import { DEFAULT_USER_PROFILE_PICTURE_LINK } from '../../../../config';
import { Request, Response, NextFunction } from 'express';

export const setDefaultProfilePicIfNotGiven =
  (bodyFieldName: string) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.body[bodyFieldName]) {
      req.body[bodyFieldName] = DEFAULT_USER_PROFILE_PICTURE_LINK;
    }
    next();
  };
