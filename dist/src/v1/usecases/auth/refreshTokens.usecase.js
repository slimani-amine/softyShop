"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshUserTokensUseCase = exports.refreshUserTokensUseCaseBase = void 0;
const exceptions_1 = require("../../core/errors/exceptions");
const users_repository_1 = require("../../data/repositories/users.repository");
const errors_1 = require("../../domain/auth/errors");
const createUserTokens_usecase_1 = require("./createUserTokens.usecase");
const refreshUserTokensUseCaseBase = (dependencies = { usersRepo: users_repository_1.usersRepo }) => async (user) => {
    const userFound = await dependencies.usersRepo.findOne({
        where: {
            id: user.id,
        },
    });
    if (!userFound) {
        exceptions_1.exceptionService.unauthorizedException({
            message: errors_1.ACCOUNT_NOT_FOUND_ERROR_MESSAGE,
        });
    }
    const accessToken = (0, createUserTokens_usecase_1.createUserAccessToken)(userFound);
    const refreshToken = (0, createUserTokens_usecase_1.createUserRefreshToken)(userFound);
    return {
        user: userFound,
        accessToken: accessToken,
        refreshToken: refreshToken,
    };
};
exports.refreshUserTokensUseCaseBase = refreshUserTokensUseCaseBase;
exports.refreshUserTokensUseCase = (0, exports.refreshUserTokensUseCaseBase)({
    usersRepo: users_repository_1.usersRepo,
});
//# sourceMappingURL=refreshTokens.usecase.js.map