"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseInterceptor = void 0;
const logger_1 = require("../../../core/logger/logger");
const responseInterceptor = (req, res, next) => {
    let intercepted = false;
    const originalSend = res.send;
    res.send = function (body) {
        if (!intercepted) {
            logger_1.logger.log('RESPONSE', `Responded to ${req === null || req === void 0 ? void 0 : req.method} request at ${req === null || req === void 0 ? void 0 : req.originalUrl} in ${Date.now() - (req === null || req === void 0 ? void 0 : req.now)}ms`);
            intercepted = true;
        }
        return originalSend.call(this, body);
    };
    next();
};
exports.responseInterceptor = responseInterceptor;
//# sourceMappingURL=response.interceptor.js.map