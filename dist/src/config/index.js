"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRONT_END_BASE_URL = exports.MAILING_CONFIG = exports.TOKENS_INFO = exports.DEFAULT_USER_PROFILE_PICTURE_LINK = exports.STATIC_FILES_PATH = exports.JWT_KEYS = exports.CORS_URL = exports.DOCS_API_BASE_URL = exports.API_BASE_URL = exports.PORT = exports.ENVIRONMENT = void 0;
const path_1 = require("path");
exports.ENVIRONMENT = process.env.NODE_ENV;
exports.PORT = process.env.SERVER_PORT;
exports.API_BASE_URL = process.env.API_BASE_URL;
exports.DOCS_API_BASE_URL = process.env.DOCS_API_BASE_URL;
exports.CORS_URL = process.env.CORS_URL;
exports.JWT_KEYS = {
    SECRET_KEY: process.env.JWT_SECRET_KEY,
    PUBLIC_KEY: process.env.JWT_PUBLIC_KEY,
};
exports.STATIC_FILES_PATH = (0, path_1.resolve)(__dirname, '../../../public');
exports.DEFAULT_USER_PROFILE_PICTURE_LINK = exports.API_BASE_URL + '/images/default.png';
exports.TOKENS_INFO = {
    ACCESS_TOKEN_VALIDATION_PERIOD: process.env.ACCESS_TOKEN_VALIDITY_PERIOD,
    REFRESH_TOKEN_VALIDATION_PERIOD: process.env.REFRESH_TOKEN_VALIDITY_PERIOD,
    ISSUER: process.env.TOKEN_ISSUER || 'StarterTeam',
    AUDIENCE: process.env.TOKEN_AUDIENCE || 'StarterTeam',
    REFRESH_TOKEN_COOKIE_NAME: process.env.JWT_REFRESH_COOKIE_NAME,
    ACCESS_TOKEN_COOKIE_NAME: process.env.JWT_ACCESS_COOKIE_NAME,
    REFRESH_TOKEN_EXPIRATION_IN_MILLISECONDS: parseInt(process.env.REFRESH_TOKEN_EXPIRATION_IN_MILLISECONDS),
    ACCESS_TOKEN_EXPIRATION_IN_MILLISECONDS: parseInt(process.env.ACCESS_TOKEN_EXPIRATION_IN_MILLISECONDS),
};
exports.MAILING_CONFIG = {
    EMAIL: process.env.EMAIL,
    PWD: process.env.EMAIL_PWD,
    SENDER: process.env.EMAIL_SENDER,
    TEST_EMAIL_RECEIVER: process.env.TEST_EMAIL_RECEIVER,
};
exports.FRONT_END_BASE_URL = process.env.FRONT_BASE_URL;
//# sourceMappingURL=index.js.map