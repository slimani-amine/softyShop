import {
  LoginUseCaseType,
  loginUseCase,
} from "../../../usecases/auth/login.usecase";
import { logger } from "../../../core/logger/logger";
import { Request, Response, NextFunction } from "express";
import { TOKENS_INFO } from "../../../../config";

export const loginControllerBase =
  (loginUseCase: LoginUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.log("LOGIN CONTROLLER", `IN LOGIN EMAIl ${req?.body?.email}`);
      const result = await loginUseCase(req?.body);
      res.cookie(TOKENS_INFO.REFRESH_TOKEN_COOKIE_NAME, result.refreshToken, {
        sameSite: "none",
        httpOnly: true,
        secure: true,
        maxAge: TOKENS_INFO.REFRESH_TOKEN_EXPIRATION_IN_MILLISECONDS,
      });
      res.cookie(TOKENS_INFO.ACCESS_TOKEN_COOKIE_NAME, result.accessToken, {
        sameSite:"none",
        httpOnly: true,
        secure: true,
        maxAge: TOKENS_INFO.ACCESS_TOKEN_EXPIRATION_IN_MILLISECONDS,
      });

      res.status(200).send({
        message: "connecté avec succès",
        data: {
          user: result.user,
          accessToken: result.accessToken,
        },
      });
    } catch (err) {
      next(err);
    }
  };

export const loginController = loginControllerBase(loginUseCase);
