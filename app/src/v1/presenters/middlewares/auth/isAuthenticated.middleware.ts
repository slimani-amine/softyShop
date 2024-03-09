import {
  ACCOUNT_VERIFICATION_REQUIRED_ERROR_MESSAGE,
  INVALID_TOKEN_ERROR_MESSAGE,
  LOGIN_REQUIRED_ERROR_MESSAGE,
} from "../../../domain/auth/errors";
import { JWT_KEYS, TOKENS_INFO } from "../../../../config";
import { exceptionService } from "../../../core/errors/exceptions";
import { IJwtAccessPayload } from "../../../usecases/auth/types/jwt.tokens";
import { Request, Response, NextFunction } from "express";
import * as jwtService from "jsonwebtoken";
import { usersRepo } from "../../../data/repositories/users.repository";

export const isAuthentictedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let accessToken;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      accessToken = req.headers.authorization.split(" ")[1];
    }

    // const accessToken = req.cookies[TOKENS_INFO.ACCESS_TOKEN_COOKIE_NAME] ;
    if (!accessToken) {
      exceptionService.unauthorizedException({
        message: LOGIN_REQUIRED_ERROR_MESSAGE,
      });
    }
    const accessTokenPayload = jwtService.verify(
      accessToken,
      JWT_KEYS.PUBLIC_KEY,
      {
        algorithms: ["RS256"],
      }
    ) as IJwtAccessPayload;
    validateAccessToken(accessTokenPayload);
    if (accessTokenPayload.isVerified !== true) {
      exceptionService.unauthorizedException({
        message: ACCOUNT_VERIFICATION_REQUIRED_ERROR_MESSAGE,
      });
    }
    const me = await usersRepo.findOne({
      relations: {
        cart: true,
      },
      where: {
        id: parseInt(accessTokenPayload.sub),
      },
      select: {
        cart: {
          id: true,
        },
      },
    });

    req.user = {
      id: accessTokenPayload.sub,
      isVerified: accessTokenPayload.isVerified,
      role: accessTokenPayload.role,
      cartId: me?.cart?.id,
    };

    next();
  } catch (err) {
    throw err;
  }
};

export const isAuthentictedMiddlewareNoVerificationNeeded = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // const accessToken = req.cookies[TOKENS_INFO.ACCESS_TOKEN_COOKIE_NAME];

    if (!token) {
      exceptionService.unauthorizedException({
        message: LOGIN_REQUIRED_ERROR_MESSAGE,
      });
    }

    const accessTokenPayload = jwtService.verify(token, JWT_KEYS.PUBLIC_KEY, {
      algorithms: ["RS256"],
    }) as IJwtAccessPayload;

    validateAccessToken(accessTokenPayload);
    req.user = {
      id: accessTokenPayload.sub,
      isVerified: accessTokenPayload.isVerified,
      role: accessTokenPayload.role,
    };
    next();
  } catch (err) {
    throw err;
  }
};

export const validateAccessToken = (tokenPayload: IJwtAccessPayload) => {
  if (
    !tokenPayload ||
    !tokenPayload.iss ||
    !tokenPayload.sub ||
    !tokenPayload.role ||
    !tokenPayload.isVerified ||
    !tokenPayload.aud ||
    tokenPayload.iss !== TOKENS_INFO.ISSUER ||
    tokenPayload.aud !== TOKENS_INFO.AUDIENCE
  )
    exceptionService.unauthorizedException({
      message: INVALID_TOKEN_ERROR_MESSAGE,
    });
  return true;
};
