"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAccessToken = exports.isAuthentictedMiddlewareNoVerificationNeeded = exports.isAuthentictedMiddleware = void 0;
const errors_1 = require("../../../domain/auth/errors");
const config_1 = require("../../../../config");
const exceptions_1 = require("../../../core/errors/exceptions");
const jwtService = require("jsonwebtoken");
const isAuthentictedMiddleware = (req, res, next) => {
    try {
        let accessToken;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
            accessToken = req.headers.authorization.split(' ')[1];
        }
        if (!accessToken) {
            exceptions_1.exceptionService.unauthorizedException({
                message: errors_1.LOGIN_REQUIRED_ERROR_MESSAGE,
            });
        }
        const accessTokenPayload = jwtService.verify(accessToken, config_1.JWT_KEYS.PUBLIC_KEY, {
            algorithms: ["RS256"],
        });
        (0, exports.validateAccessToken)(accessTokenPayload);
        req.user = accessTokenPayload.user;
        next();
    }
    catch (err) {
        throw err;
    }
};
exports.isAuthentictedMiddleware = isAuthentictedMiddleware;
const isAuthentictedMiddlewareNoVerificationNeeded = (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        const accessToken = req.cookies[config_1.TOKENS_INFO.ACCESS_TOKEN_COOKIE_NAME] || "";
        if (!accessToken) {
            exceptions_1.exceptionService.unauthorizedException({
                message: errors_1.LOGIN_REQUIRED_ERROR_MESSAGE,
            });
        }
        const accessTokenPayload = jwtService.verify(accessToken, config_1.JWT_KEYS.PUBLIC_KEY, {
            algorithms: ["RS256"],
        });
        (0, exports.validateAccessToken)(accessTokenPayload);
        req.user = accessTokenPayload.user;
        next();
    }
    catch (err) {
        throw err;
    }
};
exports.isAuthentictedMiddlewareNoVerificationNeeded = isAuthentictedMiddlewareNoVerificationNeeded;
const validateAccessToken = (tokenPayload) => {
    if (!tokenPayload ||
        !tokenPayload.iss ||
        !tokenPayload.user ||
        !tokenPayload.aud ||
        tokenPayload.iss !== config_1.TOKENS_INFO.ISSUER ||
        tokenPayload.aud !== config_1.TOKENS_INFO.AUDIENCE)
        exceptions_1.exceptionService.unauthorizedException({
            message: errors_1.INVALID_TOKEN_ERROR_MESSAGE,
        });
    return true;
};
exports.validateAccessToken = validateAccessToken;
//# sourceMappingURL=isAuthenticated.middleware.js.map