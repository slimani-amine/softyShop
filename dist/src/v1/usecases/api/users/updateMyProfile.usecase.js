"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMyProfileUseCase = exports.updateMyProfileUseCaseBase = void 0;
const errors_1 = require("../../../domain/auth/errors");
const exceptions_1 = require("../../../core/errors/exceptions");
const users_repository_1 = require("../../../data/repositories/users.repository");
const updateMyProfileUseCaseBase = (dependencies) => async (user, payload) => {
    const userFound = await dependencies.usersRepo.findOne({
        where: {
            id: parseInt(user.id),
        },
    });
    if (!userFound) {
        exceptions_1.exceptionService.notFoundException({
            message: errors_1.ACCOUNT_NOT_FOUND_ERROR_MESSAGE,
        });
    }
    const updatedUser = await dependencies.usersRepo.updateOne(userFound, {
        email: (payload === null || payload === void 0 ? void 0 : payload.email) || userFound.email,
        picture: (payload === null || payload === void 0 ? void 0 : payload.picture) || userFound.picture,
    });
    return updatedUser;
};
exports.updateMyProfileUseCaseBase = updateMyProfileUseCaseBase;
exports.updateMyProfileUseCase = (0, exports.updateMyProfileUseCaseBase)({
    usersRepo: users_repository_1.usersRepo,
});
//# sourceMappingURL=updateMyProfile.usecase.js.map