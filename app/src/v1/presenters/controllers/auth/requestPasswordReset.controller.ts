import { logger } from '../../../core/logger/logger';
import { Request, Response, NextFunction } from 'express';
import {
  RequestPasswordResetUseCaseType,
  requestPasswordResetUseCase,
} from '../../../usecases/auth/requestPasswordReset.usecase';

export const requestPasswordResetControllerBase =
  (requestUserPasswordResetUseCase: RequestPasswordResetUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.log(
        'REQUEST ACCOUNT PASSWORD RESET CONTROLLER',
        `USER ${req?.body?.email || 'unknwon'}`,
      );
      const result = await requestUserPasswordResetUseCase(req?.body);
      res.status(200).send({
        message: 'An email was sent to reset your password',
        data: result.user,
      });
    } catch (err) {
      next(err);
    }
  };

export const requestPasswordResetController = requestPasswordResetControllerBase(
  requestPasswordResetUseCase,
);
