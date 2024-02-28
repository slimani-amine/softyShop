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
        message: 'un e-mail a été envoyé pour vérifier votre compte',
        data: result.user,
      });
    } catch (err) {
      next(err);
    }
  };

export const requestAccountVerificationController = requestAccountVerificationControllerBase(
  requestAccountVerificationUseCase,
);
