import {
  ACCOUNT_VERIFICATION_REQUIRED_ERROR_MESSAGE,
  INVALID_TOKEN_ERROR_MESSAGE,
  LOGIN_REQUIRED_ERROR_MESSAGE,
} from '../../../domain/auth/errors';
import { JWT_KEYS, TOKENS_INFO } from '../../../../config';
import { exceptionService } from '../../../core/errors/exceptions';
import { IJwtAccessPayload } from '../../../usecases/auth/types/jwt.tokens';
import { Request, Response, NextFunction } from 'express';
import * as jwtService from 'jsonwebtoken';

export const isAuthentictedMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken =
      req.cookies[TOKENS_INFO.ACCESS_TOKEN_COOKIE_NAME] ||
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDkxMTc5NjAsInVzZXIiOnsiaWQiOiIzIiwiaXNWZXJpZmllZCI6dHJ1ZSwiZW1haWwiOiJ2ZW5kb3IwMUBnbWFpbC5jb20iLCJyb2xlIjoidmVuZG9yIn0sImlzcyI6IlN0YXJ0ZXJUZWFtIiwiYXVkIjoiU3RhcnRlclRlYW0iLCJleHAiOjE3MTY4OTM5NjB9.i5pl2HF0G-c1NBrOb0XJlmYzUX8DHiX2hqSzandGCqZ6w_r5Pn60c1KILK5f3erMG9gtC3LB2QOS2ytcaY4dZmny8oWAGOGfCjOCcCV-p5H_2q_xSQSRU6wd44S6YmgbPhK4D4f-OySg_ucdeVhuVvBoV9D5sGUZO7fenEpi5Y5EJ4uagCuO6XXUHX5wP1T3AxRyHZ6-wHe1oWDHXTkYZDUtml5FIx8R6GTo9ioqrdhZayzyKcwqtNmUMwcMqnAeVVnUUd6nMOyvd5w1HeeijBeoQL9C_CVf6YbBXRbhgj3YAxXoPUU2KksohjDuWhyC7Tf53Ihwu7wyU5MayqraX5Kl4vtc8wXcRN2uNW7MQaiJjYcrhYKTyyYUMjO4S_MJ1K5cBwOcOQR83rRuw_wdwRNF7k1GRnQfUQO5v5wndhkwex3xXpBj7llYemoLBmW1lTY0YbDM4TUhton0OjwCOTd6ug3IU-qruGhv-v-rk0LG2bg9EIHRoXk3NoI41r6YYTJ7s8huhPXLjly8a2vlbKqiET2v36ELgCkxul34fDnbeo7h1odR03QtL0eO_VT3-ZT6dBenhTiGsvRTvPx2zosa_LfT4RvHOSZf25gmblXBBZn4sfycjHm0RhyJeSfJZN8zQws4JOR5SYHQinfil_ICbY4rDWt4T22t9HdzDDw';
    if (!accessToken) {
      exceptionService.unauthorizedException({
        message: LOGIN_REQUIRED_ERROR_MESSAGE,
      });
    }
    const accessTokenPayload = jwtService.verify(accessToken, JWT_KEYS.PUBLIC_KEY, {
      algorithms: ['RS256'],
    }) as IJwtAccessPayload;
    validateAccessToken(accessTokenPayload);
    // if (accessTokenPayload.user.isVerified !== true) {
    //   exceptionService.unauthorizedException({
    //     message: ACCOUNT_VERIFICATION_REQUIRED_ERROR_MESSAGE,
    //   });
    // }
    req.user = accessTokenPayload.user;
    next();
  } catch (err) {
    throw err;
  }
};

export const isAuthentictedMiddlewareNoVerificationNeeded = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const accessToken =
      req.cookies[TOKENS_INFO.ACCESS_TOKEN_COOKIE_NAME] ||
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDkxMTc5NjAsInVzZXIiOnsiaWQiOiIzIiwiaXNWZXJpZmllZCI6dHJ1ZSwiZW1haWwiOiJ2ZW5kb3IwMUBnbWFpbC5jb20iLCJyb2xlIjoidmVuZG9yIn0sImlzcyI6IlN0YXJ0ZXJUZWFtIiwiYXVkIjoiU3RhcnRlclRlYW0iLCJleHAiOjE3MTY4OTM5NjB9.i5pl2HF0G-c1NBrOb0XJlmYzUX8DHiX2hqSzandGCqZ6w_r5Pn60c1KILK5f3erMG9gtC3LB2QOS2ytcaY4dZmny8oWAGOGfCjOCcCV-p5H_2q_xSQSRU6wd44S6YmgbPhK4D4f-OySg_ucdeVhuVvBoV9D5sGUZO7fenEpi5Y5EJ4uagCuO6XXUHX5wP1T3AxRyHZ6-wHe1oWDHXTkYZDUtml5FIx8R6GTo9ioqrdhZayzyKcwqtNmUMwcMqnAeVVnUUd6nMOyvd5w1HeeijBeoQL9C_CVf6YbBXRbhgj3YAxXoPUU2KksohjDuWhyC7Tf53Ihwu7wyU5MayqraX5Kl4vtc8wXcRN2uNW7MQaiJjYcrhYKTyyYUMjO4S_MJ1K5cBwOcOQR83rRuw_wdwRNF7k1GRnQfUQO5v5wndhkwex3xXpBj7llYemoLBmW1lTY0YbDM4TUhton0OjwCOTd6ug3IU-qruGhv-v-rk0LG2bg9EIHRoXk3NoI41r6YYTJ7s8huhPXLjly8a2vlbKqiET2v36ELgCkxul34fDnbeo7h1odR03QtL0eO_VT3-ZT6dBenhTiGsvRTvPx2zosa_LfT4RvHOSZf25gmblXBBZn4sfycjHm0RhyJeSfJZN8zQws4JOR5SYHQinfil_ICbY4rDWt4T22t9HdzDDw';
    if (!accessToken) {
      exceptionService.unauthorizedException({
        message: LOGIN_REQUIRED_ERROR_MESSAGE,
      });
    }

    const accessTokenPayload = jwtService.verify(accessToken, JWT_KEYS.PUBLIC_KEY, {
      algorithms: ['RS256'],
    }) as IJwtAccessPayload;

    console.log('🚀 ~ accessTokenPayload:', accessTokenPayload);
    validateAccessToken(accessTokenPayload);
    req.user = accessTokenPayload.user;
    next();
  } catch (err) {
    throw err;
  }
};

export const validateAccessToken = (tokenPayload: IJwtAccessPayload) => {
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
