"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserTokensUseCase = exports.createUserRefreshToken = exports.createUserAccessToken = exports.createUserTokensUseCaseBase = void 0;
const jwtService = require("jsonwebtoken");
const index_1 = require("../../../config/index");
const createUserTokensUseCaseBase = () => async (user) => {
    const accessToken = (0, exports.createUserAccessToken)(user);
    const refreshToken = (0, exports.createUserRefreshToken)(user);
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
    };
};
exports.createUserTokensUseCaseBase = createUserTokensUseCaseBase;
const createUserAccessToken = (user) => {
    const accessTokenPayload = {
        iat: Math.floor(Date.now() / 1000),
        iss: index_1.TOKENS_INFO.ISSUER,
        aud: index_1.TOKENS_INFO.AUDIENCE,
        isVerified: user.isVerified,
        sub: user.id,
        role: user.role,
    };
    const accessToken = jwtService.sign(accessTokenPayload, index_1.JWT_KEYS.SECRET_KEY, {
        algorithm: "RS256",
        expiresIn: index_1.TOKENS_INFO.ACCESS_TOKEN_VALIDATION_PERIOD,
    });
    return accessToken;
};
exports.createUserAccessToken = createUserAccessToken;
const createUserRefreshToken = (user) => {
    const refreshTokenPayload = {
        iat: Math.floor(Date.now() / 1000),
        iss: index_1.TOKENS_INFO.ISSUER,
        aud: index_1.TOKENS_INFO.AUDIENCE,
        isVerified: user.isVerified,
        sub: user.id,
        role: user.role,
    };
    const refreshToken = jwtService.sign(refreshTokenPayload, index_1.JWT_KEYS.SECRET_KEY, {
        algorithm: "RS256",
        expiresIn: index_1.TOKENS_INFO.REFRESH_TOKEN_VALIDATION_PERIOD,
    });
    return refreshToken;
};
exports.createUserRefreshToken = createUserRefreshToken;
exports.createUserTokensUseCase = (0, exports.createUserTokensUseCaseBase)();
//# sourceMappingURL=createUserTokens.usecase.js.map