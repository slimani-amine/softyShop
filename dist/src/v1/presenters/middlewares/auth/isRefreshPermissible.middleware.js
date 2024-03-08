"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRefreshToken = exports.isRefreshPermissibledMiddleware = void 0;
const errors_1 = require("../../../domain/auth/errors");
const config_1 = require("../../../../config");
const exceptions_1 = require("../../../core/errors/exceptions");
const jwtService = require("jsonwebtoken");
const isRefreshPermissibledMiddleware = (req, res, next) => {
    const refreshToken = req === null || req === void 0 ? void 0 : req.cookies[config_1.TOKENS_INFO.REFRESH_TOKEN_COOKIE_NAME];
    if (!refreshToken) {
        exceptions_1.exceptionService.unauthorizedException({
            message: errors_1.LOGIN_REQUIRED_ERROR_MESSAGE,
        });
    }
    const refreshTokenPayload = jwtService.verify(refreshToken, config_1.JWT_KEYS.PUBLIC_KEY, {
        algorithms: ["RS256"],
    });
    (0, exports.validateRefreshToken)(refreshTokenPayload);
    req.user = {
        id: refreshTokenPayload.sub,
        isVerified: refreshTokenPayload.isVerified,
        role: refreshTokenPayload.role,
    };
    next();
};
exports.isRefreshPermissibledMiddleware = isRefreshPermissibledMiddleware;
const validateRefreshToken = (tokenPayload) => {
    if (!tokenPayload ||
        !tokenPayload.iss ||
        !tokenPayload.sub ||
        !tokenPayload.role ||
        !tokenPayload.isVerified ||
        !tokenPayload.aud ||
        tokenPayload.iss !== config_1.TOKENS_INFO.ISSUER ||
        tokenPayload.aud !== config_1.TOKENS_INFO.AUDIENCE)
        exceptions_1.exceptionService.unauthorizedException({
            message: errors_1.INVALID_TOKEN_ERROR_MESSAGE,
        });
    return true;
};
exports.validateRefreshToken = validateRefreshToken;
//# sourceMappingURL=isRefreshPermissible.middleware.js.map