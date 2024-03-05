"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.loginControllerBase = void 0;
const login_usecase_1 = require("../../../usecases/auth/login.usecase");
const logger_1 = require("../../../core/logger/logger");
const config_1 = require("../../../../config");
const loginControllerBase = (loginUseCase) => async (req, res, next) => {
    var _a;
    try {
        logger_1.logger.log("LOGIN CONTROLLER", `IN LOGIN EMAIl ${(_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email}`);
        const result = await loginUseCase(req === null || req === void 0 ? void 0 : req.body);
        res.cookie(config_1.TOKENS_INFO.REFRESH_TOKEN_COOKIE_NAME, result.refreshToken, {
            sameSite: "none",
            httpOnly: true,
            secure: true,
            maxAge: config_1.TOKENS_INFO.REFRESH_TOKEN_EXPIRATION_IN_MILLISECONDS,
        });
        res.cookie(config_1.TOKENS_INFO.ACCESS_TOKEN_COOKIE_NAME, result.accessToken, {
            sameSite: "none",
            httpOnly: true,
            secure: true,
            maxAge: config_1.TOKENS_INFO.ACCESS_TOKEN_EXPIRATION_IN_MILLISECONDS,
        });
        res.status(200).send({
            message: "connecté avec succès",
            data: {
                user: result.user,
                accessToken: result.accessToken,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.loginControllerBase = loginControllerBase;
exports.loginController = (0, exports.loginControllerBase)(login_usecase_1.loginUseCase);
//# sourceMappingURL=login.controller.js.map