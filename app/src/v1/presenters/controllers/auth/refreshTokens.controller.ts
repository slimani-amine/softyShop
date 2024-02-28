import { TOKENS_INFO } from '../../../../config';
import {
  RefreshUserTokensUseCaseType,
  refreshUserTokensUseCase,
} from '../../../usecases/auth/refreshTokens.usecase';
import { Request, Response, NextFunction } from 'express';

const refreshTokensControllerBase =
  (refreshUserTokensUseCase: RefreshUserTokensUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await refreshUserTokensUseCase(req?.user);
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
      return res.status(201).json({
        message: 'succès',
        data: {
          user: result.user,
          accessToken: result.accessToken,
        },
      });
    } catch (err) {
      next(err);
    }
  };

const refreshTokensController = refreshTokensControllerBase(refreshUserTokensUseCase);
export { refreshTokensController, refreshTokensControllerBase };
