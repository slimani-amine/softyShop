import { logger } from '../../../core/logger/logger';
import { Request, Response, NextFunction } from 'express';
import {
  VerifyAccountUseCaseType,
  verifyAccountUseCase,
} from '../../../usecases/auth/verifyAccount.usecase';
import { TOKENS_INFO } from '../../../../config';

export const verifyAccountControllerBase =
  (verifyAccountUseCase: VerifyAccountUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.log('VERIFY ACCOUNT CONTROLLER', `Code: ${req?.body?.code}`);
      const result = await verifyAccountUseCase(req?.body);
      res.cookie(TOKENS_INFO.REFRESH_TOKEN_COOKIE_NAME, result.refreshToken, {
        sameSite: 'none',
        httpOnly: true,
        secure: true,
        maxAge: TOKENS_INFO.REFRESH_TOKEN_EXPIRATION_IN_MILLISECONDS,
      });
      res.cookie(TOKENS_INFO.ACCESS_TOKEN_COOKIE_NAME, result.accessToken, {
        sameSite: 'none',
        httpOnly: true,
        secure: true,
        maxAge: TOKENS_INFO.ACCESS_TOKEN_EXPIRATION_IN_MILLISECONDS,
      });
      res.status(200).send({
        message: 'succès',
        data: result.user,
      });
    } catch (err) {
      next(err);
    }
  };

export const verifyAccountController = verifyAccountControllerBase(verifyAccountUseCase);
