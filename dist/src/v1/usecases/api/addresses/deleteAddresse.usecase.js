"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddressUseCase = exports.deleteAddressUseCaseBase = void 0;
const addresses_repository_1 = require("../../../data/repositories/addresses.repository");
const exceptions_1 = require("../../../core/errors/exceptions");
const deleteAddressUseCaseBase = (dependencies) => async (queryParams) => {
    const address = await dependencies.addressRepo.findOne({
        where: { id: queryParams.id },
    });
    if (!address) {
        exceptions_1.exceptionService.notFoundException({
            message: "Address not found",
        });
    }
    const addressesFound = await dependencies.addressRepo.deleteAddress(address);
    return addressesFound;
};
exports.deleteAddressUseCaseBase = deleteAddressUseCaseBase;
exports.deleteAddressUseCase = (0, exports.deleteAddressUseCaseBase)({
    addressRepo: addresses_repository_1.addressRepo,
});
//# sourceMappingURL=deleteAddresse.usecase.js.map