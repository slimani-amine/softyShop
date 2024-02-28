"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVerificationRequestPermissibledMiddleware = void 0;
const config_1 = require("../../../../config");
const exceptions_1 = require("../../../core/errors/exceptions");
const jwtService = require("jsonwebtoken");
const isAuthenticated_middleware_1 = require("./isAuthenticated.middleware");
const errors_1 = require("../../../domain/auth/errors");
const isVerificationRequestPermissibledMiddleware = (req, res, next) => {
    const accessToken = req === null || req === void 0 ? void 0 : req.cookies[config_1.TOKENS_INFO.ACCESS_TOKEN_COOKIE_NAME];
    if (!accessToken) {
        exceptions_1.exceptionService.unauthorizedException({
            message: errors_1.LOGIN_REQUIRED_ERROR_MESSAGE,
        });
    }
    const accessTokenPayload = jwtService.verify(accessToken, config_1.JWT_KEYS.PUBLIC_KEY, {
        algorithms: ['RS256'],
    });
    (0, isAuthenticated_middleware_1.validateAccessToken)(accessTokenPayload);
    if (accessTokenPayload.user.isVerified === true) {
        exceptions_1.exceptionService.forbiddenException({
            message: errors_1.ACCOUNT_ALREADY_VERIFIED_ERROR_MESSAGE,
        });
    }
    req.user = accessTokenPayload.user;
    next();
};
exports.isVerificationRequestPermissibledMiddleware = isVerificationRequestPermissibledMiddleware;
//# sourceMappingURL=isVerificationRequestPermissible.js.map