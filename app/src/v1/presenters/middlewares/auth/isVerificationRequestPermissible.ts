import { IJwtAccessPayload } from '../../../usecases/auth/types/jwt.tokens';
import { JWT_KEYS, TOKENS_INFO } from '../../../../config';
import { exceptionService } from '../../../core/errors/exceptions';
import { Request, Response, NextFunction } from 'express';
import * as jwtService from 'jsonwebtoken';
import { validateAccessToken } from './isAuthenticated.middleware';
import {
  ACCOUNT_ALREADY_VERIFIED_ERROR_MESSAGE,
  LOGIN_REQUIRED_ERROR_MESSAGE,
} from '../../../domain/auth/errors';

export const isVerificationRequestPermissibledMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req?.cookies[TOKENS_INFO.ACCESS_TOKEN_COOKIE_NAME];
  if (!accessToken) {
    exceptionService.unauthorizedException({
      message: LOGIN_REQUIRED_ERROR_MESSAGE,
    });
  }
  const accessTokenPayload = jwtService.verify(accessToken, JWT_KEYS.PUBLIC_KEY, {
    algorithms: ['RS256'],
  }) as IJwtAccessPayload;
  validateAccessToken(accessTokenPayload);
  if (accessTokenPayload.user.isVerified === true) {
    exceptionService.forbiddenException({
      message: ACCOUNT_ALREADY_VERIFIED_ERROR_MESSAGE,
    });
  }
  req.user = accessTokenPayload.user;
  next();
};
