import { logger } from '../../../core/logger/logger';
import { Request, Response, NextFunction } from 'express';

export const requestInterceptor = (req: Request, res: Response, next: NextFunction) => {
  req.now = Date.now();
  logger.log('REQUEST', `Received ${req?.method} request at ${req?.originalUrl}`);
  next();
};
