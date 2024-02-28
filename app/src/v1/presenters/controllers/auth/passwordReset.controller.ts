import { logger } from '../../../core/logger/logger';
import { Request, Response, NextFunction } from 'express';
import {
  PasswordResetUseCaseType,
  passwordResetUseCase,
} from '../../../usecases/auth/passwordReset.usecase';

export const passwordResetControllerBase =
  (passwordResetUseCase: PasswordResetUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.log(
        'REQUEST ACCOUNT PASSWORD RESET CONTROLLER',
        `Token ${req?.body?.token || 'unknwon'}`,
      );
      const result = await passwordResetUseCase(req?.body);
      res.status(200).send({
        message: 'réinitialiser le mot de passe avec succès',
        data: result.user,
      });
    } catch (err) {
      next(err);
    }
  };

export const passwordResetController = passwordResetControllerBase(passwordResetUseCase);
