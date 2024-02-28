"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAccessToken = exports.isAuthentictedMiddlewareNoVerificationNeeded = exports.isAuthentictedMiddleware = void 0;
const errors_1 = require("../../../domain/auth/errors");
const config_1 = require("../../../../config");
const exceptions_1 = require("../../../core/errors/exceptions");
const jwtService = require("jsonwebtoken");
const isAuthentictedMiddleware = (req, res, next) => {
    try {
        const accessToken = req.cookies[config_1.TOKENS_INFO.ACCESS_TOKEN_COOKIE_NAME] ||
            'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDkxMTY5MDYsInVzZXIiOnsiaWQiOiIxIiwiaXNWZXJpZmllZCI6dHJ1ZSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4ifSwiaXNzIjoiU3RhcnRlclRlYW0iLCJhdWQiOiJTdGFydGVyVGVhbSIsImV4cCI6MTcxNjg5MjkwNn0.ndfyXRp-wglcXjlBOkxHYfXv6H4tY4FBDM7Wk4QdrL328_vR3yUOPmXBmBdBpylt6hoy9wlnfWgXTpIIMKXzED72AB4EZdOKrIyTQqm-zzK7BqLYqTQu_59n7rZfM0w-f2ZfMxMpcEjFQMK_xhaE3c8CJzvkJgYIhVliwK5KsqzoN3fCxYUL7AIRi7Btayy5hSeeoDnYQvW0KTw3zhVvcqtGumvXlIHEWuV9z5_puynqLeAQWtrbuDcrKorqA_5hxe13F0RUwHVmbBBdUARhtLNsobtvIprzRpr98OhgwX4_AQ3DMefQaTWbxv1JoskQ8SUdjb9uZA1DlfajTxiNHRmwHkQvDWE60V5t4OvdQ5fcYQbR3050oX7C29WmfrktXuuzBrJcMOYJPDbAZVXz2lK-a1rWvoNO4-ivV2VjYTIv26oK_Ao5ltt40L173qoAn9ks6TCio7SthvTXIS_mt2tZjRRbwlob10MsaomdatovzBxpd8LWZ4dstb8Q4I5Db-yTLQtrjnSNhSLNoY2exU_8u0K5A2rgZyEPFOtaNx4fpW6oV3bCswsM58HEOy5f2BwVnjlXMUOK9oTUK3-rC0j4ZgjQEZ35H0B9h_cBkPdEnx0KabFYjxVWRm1jBwcJes22IfcdjTin4QqqsfmYNMmQBqK8xk7P-6-vpJF4iCM';
        if (!accessToken) {
            exceptions_1.exceptionService.unauthorizedException({
                message: errors_1.LOGIN_REQUIRED_ERROR_MESSAGE,
            });
        }
        const accessTokenPayload = jwtService.verify(accessToken, config_1.JWT_KEYS.PUBLIC_KEY, {
            algorithms: ['RS256'],
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
        const accessToken = req.cookies[config_1.TOKENS_INFO.ACCESS_TOKEN_COOKIE_NAME] ||
            'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDkxMTY5MDYsInVzZXIiOnsiaWQiOiIxIiwiaXNWZXJpZmllZCI6dHJ1ZSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4ifSwiaXNzIjoiU3RhcnRlclRlYW0iLCJhdWQiOiJTdGFydGVyVGVhbSIsImV4cCI6MTcxNjg5MjkwNn0.ndfyXRp-wglcXjlBOkxHYfXv6H4tY4FBDM7Wk4QdrL328_vR3yUOPmXBmBdBpylt6hoy9wlnfWgXTpIIMKXzED72AB4EZdOKrIyTQqm-zzK7BqLYqTQu_59n7rZfM0w-f2ZfMxMpcEjFQMK_xhaE3c8CJzvkJgYIhVliwK5KsqzoN3fCxYUL7AIRi7Btayy5hSeeoDnYQvW0KTw3zhVvcqtGumvXlIHEWuV9z5_puynqLeAQWtrbuDcrKorqA_5hxe13F0RUwHVmbBBdUARhtLNsobtvIprzRpr98OhgwX4_AQ3DMefQaTWbxv1JoskQ8SUdjb9uZA1DlfajTxiNHRmwHkQvDWE60V5t4OvdQ5fcYQbR3050oX7C29WmfrktXuuzBrJcMOYJPDbAZVXz2lK-a1rWvoNO4-ivV2VjYTIv26oK_Ao5ltt40L173qoAn9ks6TCio7SthvTXIS_mt2tZjRRbwlob10MsaomdatovzBxpd8LWZ4dstb8Q4I5Db-yTLQtrjnSNhSLNoY2exU_8u0K5A2rgZyEPFOtaNx4fpW6oV3bCswsM58HEOy5f2BwVnjlXMUOK9oTUK3-rC0j4ZgjQEZ35H0B9h_cBkPdEnx0KabFYjxVWRm1jBwcJes22IfcdjTin4QqqsfmYNMmQBqK8xk7P-6-vpJF4iCM';
        if (!accessToken) {
            exceptions_1.exceptionService.unauthorizedException({
                message: errors_1.LOGIN_REQUIRED_ERROR_MESSAGE,
            });
        }
        const accessTokenPayload = jwtService.verify(accessToken, config_1.JWT_KEYS.PUBLIC_KEY, {
            algorithms: ['RS256'],
        });
        console.log('🚀 ~ accessTokenPayload:', accessTokenPayload);
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
        exceptions_1.exceptionService.unauthorizedException({ message: errors_1.INVALID_TOKEN_ERROR_MESSAGE });
    return true;
};
exports.validateAccessToken = validateAccessToken;
//# sourceMappingURL=isAuthenticated.middleware.js.map