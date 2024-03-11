"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAddressesUseCase = exports.getUserAddressesUseCaseBase = void 0;
const exceptions_1 = require("../../../core/errors/exceptions");
const users_repository_1 = require("../../../data/repositories/users.repository");
const addresses_repository_1 = require("../../../data/repositories/addresses.repository");
const getUserAddressesUseCaseBase = (dependencies) => async (queryParams) => {
    const UserId = queryParams.userId;
    const user = (await users_repository_1.usersRepo.findOne({
        where: { id: UserId },
    }));
    if (!user) {
        exceptions_1.exceptionService.notFoundException({
            message: "User not found",
        });
    }
    const addressesFound = await dependencies.addressRepo.findMyAddresses({
        where: { user: { id: UserId } },
    });
    return addressesFound;
};
exports.getUserAddressesUseCaseBase = getUserAddressesUseCaseBase;
exports.getUserAddressesUseCase = (0, exports.getUserAddressesUseCaseBase)({
    addressRepo: addresses_repository_1.addressRepo,
});
//# sourceMappingURL=getUserAddresses.usecase.js.map