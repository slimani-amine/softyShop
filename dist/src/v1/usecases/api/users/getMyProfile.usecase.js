"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyProfileUseCase = exports.getMyProfileUseCaseBase = void 0;
const errors_1 = require("../../../domain/auth/errors");
const exceptions_1 = require("../../../core/errors/exceptions");
const users_repository_1 = require("../../../data/repositories/users.repository");
const getMyProfileUseCaseBase = (dependencies) => async (user) => {
  const userFound = await dependencies.usersRepo.findOne({
    relations: {
      cart: true,
    },
    where: {
      id: user.id,
    },
    select: {
      cart: {
        id: true,
      },
    },
  });
  if (!userFound) {
    exceptions_1.exceptionService.notFoundException({
      message: errors_1.ACCOUNT_NOT_FOUND_ERROR_MESSAGE,
    });
  }
  return userFound;
};
exports.getMyProfileUseCaseBase = getMyProfileUseCaseBase;
exports.getMyProfileUseCase = (0, exports.getMyProfileUseCaseBase)({
  usersRepo: users_repository_1.usersRepo,
});
//# sourceMappingURL=getMyProfile.usecase.js.map
