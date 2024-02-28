import { logger } from '../../../core/logger/logger';
import { Request, Response, NextFunction } from 'express';

export const responseInterceptor = (req: Request, res: Response, next: NextFunction) => {
  let intercepted = false;

  const originalSend = res.send;

  res.send = function (body: any): any {
    if (!intercepted) {
      logger.log(
        'RESPONSE',
        `Responded to ${req?.method} request at ${req?.originalUrl} in ${Date.now() - req?.now}ms`,
      );
      intercepted = true;
    }

    return originalSend.call(this, body);
  };

  next();
};
