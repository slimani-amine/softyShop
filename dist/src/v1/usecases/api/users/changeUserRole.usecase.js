"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUserRoleUseCase = exports.changeUserRoleUseCaseBase = void 0;
const errors_1 = require("../../../domain/auth/errors");
const exceptions_1 = require("../../../core/errors/exceptions");
const users_repository_1 = require("../../../data/repositories/users.repository");
const changeUserRoleUseCaseBase = (dependencies) => async (userId, payload) => {
    const userFound = await dependencies.usersRepo.findOne({
        where: {
            id: parseInt(userId),
        },
    });
    if (!userFound) {
        exceptions_1.exceptionService.notFoundException({
            message: errors_1.ACCOUNT_NOT_FOUND_ERROR_MESSAGE,
        });
    }
    const updatedUser = await dependencies.usersRepo.updateOne(userFound, {
        role: payload === null || payload === void 0 ? void 0 : payload.role,
    });
    return updatedUser;
};
exports.changeUserRoleUseCaseBase = changeUserRoleUseCaseBase;
exports.changeUserRoleUseCase = (0, exports.changeUserRoleUseCaseBase)({
    usersRepo: users_repository_1.usersRepo,
});
//# sourceMappingURL=changeUserRole.usecase.js.map