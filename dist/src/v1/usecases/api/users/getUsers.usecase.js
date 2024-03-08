"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersUseCase = exports.getUsersUseCaseBase = void 0;
const users_repository_1 = require("../../../data/repositories/users.repository");
const getUsersUseCaseBase = (dependencies) => async (queryParams) => {
    console.log("🚀 ~ queryParams:", queryParams);
    const result = await dependencies.usersRepo.findByQuery(queryParams);
    return result;
};
exports.getUsersUseCaseBase = getUsersUseCaseBase;
exports.getUsersUseCase = (0, exports.getUsersUseCaseBase)({ usersRepo: users_repository_1.usersRepo });
//# sourceMappingURL=getUsers.usecase.js.map