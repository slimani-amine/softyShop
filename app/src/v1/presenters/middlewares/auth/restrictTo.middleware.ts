import { exceptionService } from '../../../core/errors/exceptions';
import { Request, Response, NextFunction } from 'express';

export const restrictToMiddleware =
  (...roles) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('🚀 ~ isAuthentictedMiddleware ~ req.user:', req.user);
      if (!roles.includes(req.user.role)) {
        exceptionService.unauthorizedException({
          message: `RBAC! You Not Have Role to access this`,
        });
      }
      next();
    } catch (err) {
      throw err;
    }
  };
