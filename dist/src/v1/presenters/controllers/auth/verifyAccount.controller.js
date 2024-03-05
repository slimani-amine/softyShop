"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccountController = exports.verifyAccountControllerBase = void 0;
const logger_1 = require("../../../core/logger/logger");
const verifyAccount_usecase_1 = require("../../../usecases/auth/verifyAccount.usecase");
const config_1 = require("../../../../config");
const verifyAccountControllerBase = (verifyAccountUseCase) => async (req, res, next) => {
    var _a;
    try {
        logger_1.logger.log("VERIFY ACCOUNT CONTROLLER", `Code: ${(_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.code}`);
        const result = await verifyAccountUseCase(req === null || req === void 0 ? void 0 : req.body);
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
            message: "succès",
            data: result.user,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.verifyAccountControllerBase = verifyAccountControllerBase;
exports.verifyAccountController = (0, exports.verifyAccountControllerBase)(verifyAccount_usecase_1.verifyAccountUseCase);
//# sourceMappingURL=verifyAccount.controller.js.map