import {
  INVALID_TOKEN_ERROR_MESSAGE,
  LOGIN_REQUIRED_ERROR_MESSAGE,
} from '../../../domain/auth/errors';
import { JWT_KEYS, TOKENS_INFO } from '../../../../config';
import { exceptionService } from '../../../core/errors/exceptions';
import { IJwtRefreshPayload } from '../../../usecases/auth/types/jwt.tokens';
import { Request, Response, NextFunction } from 'express';
import * as jwtService from 'jsonwebtoken';

export const isRefreshPermissibledMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const refreshToken = req?.cookies[TOKENS_INFO.REFRESH_TOKEN_COOKIE_NAME];
  if (!refreshToken) {
    exceptionService.unauthorizedException({
      message: LOGIN_REQUIRED_ERROR_MESSAGE,
    });
  }
  const refreshTokenPayload = jwtService.verify(refreshToken, JWT_KEYS.PUBLIC_KEY, {
    algorithms: ['RS256'],
  }) as IJwtRefreshPayload;
  validateRefreshToken(refreshTokenPayload);
  req.user = refreshTokenPayload.user;
  next();
};

export const validateRefreshToken = (tokenPayload: IJwtRefreshPayload) => {
  if (
    !tokenPayload ||
    !tokenPayload.iss ||
    !tokenPayload.user ||
    !tokenPayload.aud ||
    tokenPayload.iss !== TOKENS_INFO.ISSUER ||
    tokenPayload.aud !== TOKENS_INFO.AUDIENCE
  )
    exceptionService.unauthorizedException({ message: INVALID_TOKEN_ERROR_MESSAGE });
  return true;
};
