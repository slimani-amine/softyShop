"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = exports.logoutControllerBase = void 0;
const logger_1 = require("../../../core/logger/logger");
const config_1 = require("../../../../config");
const logoutControllerBase = () => async (req, res, next) => {
    try {
        logger_1.logger.log('LOGOUT CONTROLLER', `IN LOGOUT EMAIl ${req === null || req === void 0 ? void 0 : req.user.id}`);
        res.clearCookie(config_1.TOKENS_INFO.ACCESS_TOKEN_COOKIE_NAME);
        res.clearCookie(config_1.TOKENS_INFO.REFRESH_TOKEN_COOKIE_NAME);
        res.status(200).send({
            message: 'successfully disconnected',
            data: {},
        });
    }
    catch (err) {
        next(err);
    }
};
exports.logoutControllerBase = logoutControllerBase;
exports.logoutController = (0, exports.logoutControllerBase)();
//# sourceMappingURL=logout.controller.js.map