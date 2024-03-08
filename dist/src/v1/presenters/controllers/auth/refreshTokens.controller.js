"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokensControllerBase = exports.refreshTokensController = void 0;
const config_1 = require("../../../../config");
const refreshTokens_usecase_1 = require("../../../usecases/auth/refreshTokens.usecase");
const refreshTokensControllerBase = (refreshUserTokensUseCase) => async (req, res, next) => {
    try {
        const result = await refreshUserTokensUseCase(req === null || req === void 0 ? void 0 : req.user);
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
        return res.status(201).json({
            message: "success",
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
exports.refreshTokensControllerBase = refreshTokensControllerBase;
const refreshTokensController = refreshTokensControllerBase(refreshTokens_usecase_1.refreshUserTokensUseCase);
exports.refreshTokensController = refreshTokensController;
//# sourceMappingURL=refreshTokens.controller.js.map