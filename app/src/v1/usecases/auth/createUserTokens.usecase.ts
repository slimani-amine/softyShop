import * as jwtService from "jsonwebtoken";
import { IUser } from "../../domain/users/user";
import { IJwtAccessPayload, IJwtRefreshPayload } from "./types/jwt.tokens";
import { JWT_KEYS, TOKENS_INFO } from "../../../config/index";
export type CreateUserTokensUseCaseType = (
  payload: IUser
) => Promise<{ accessToken: string; refreshToken: string }>;

export const createUserTokensUseCaseBase =
  (): CreateUserTokensUseCaseType => async (user: IUser) => {
    const accessToken = createUserAccessToken(user);
    const refreshToken = createUserRefreshToken(user);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  };
export const createUserAccessToken = (user: IUser) => {
  const accessTokenPayload: IJwtAccessPayload = {
    iat: Math.floor(Date.now() / 1000),
    iss: TOKENS_INFO.ISSUER,
    aud: TOKENS_INFO.AUDIENCE,
    isVerified: user.isVerified,
    sub: user.id,
    role: user.role,
  };
  const accessToken = jwtService.sign(accessTokenPayload, JWT_KEYS.SECRET_KEY, {
    algorithm: "RS256",
    expiresIn: TOKENS_INFO.ACCESS_TOKEN_VALIDATION_PERIOD,
  });

  return accessToken;
};
export const createUserRefreshToken = (user: IUser) => {
  const refreshTokenPayload: IJwtRefreshPayload = {
    iat: Math.floor(Date.now() / 1000),
    iss: TOKENS_INFO.ISSUER,
    aud: TOKENS_INFO.AUDIENCE,
    isVerified: user.isVerified,
    sub: user.id,
    role: user.role,
  };
  const refreshToken = jwtService.sign(
    refreshTokenPayload,
    JWT_KEYS.SECRET_KEY,
    {
      algorithm: "RS256",
      expiresIn: TOKENS_INFO.REFRESH_TOKEN_VALIDATION_PERIOD,
    }
  );
  return refreshToken;
};
export const createUserTokensUseCase: CreateUserTokensUseCaseType =
  createUserTokensUseCaseBase();
