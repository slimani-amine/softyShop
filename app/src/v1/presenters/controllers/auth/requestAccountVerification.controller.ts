import { logger } from '../../../core/logger/logger';
import { Request, Response, NextFunction } from 'express';
import {
  RequestAccountVerificationUseCaseType,
  requestAccountVerificationUseCase,
} from '../../../usecases/auth/requestAccountVerification.usecase';

export const requestAccountVerificationControllerBase =
  (requestUserAccountVerificationUseCase: RequestAccountVerificationUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.log('REQUEST ACCOUNT VERIFICATION CONTROLLER', `USER ${req?.user.id}`);
      const result = await requestUserAccountVerificationUseCase(req?.user);
      res.status(200).send({
        message: 'An email was sent to check your account',
        data: result.user,
      });
    } catch (err) {
      next(err);
    }
  };

export const requestAccountVerificationController = requestAccountVerificationControllerBase(
  requestAccountVerificationUseCase,
);
