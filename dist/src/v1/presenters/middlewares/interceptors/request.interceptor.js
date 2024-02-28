"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestInterceptor = void 0;
const logger_1 = require("../../../core/logger/logger");
const requestInterceptor = (req, res, next) => {
    req.now = Date.now();
    logger_1.logger.log('REQUEST', `Received ${req === null || req === void 0 ? void 0 : req.method} request at ${req === null || req === void 0 ? void 0 : req.originalUrl}`);
    next();
};
exports.requestInterceptor = requestInterceptor;
//# sourceMappingURL=request.interceptor.js.map