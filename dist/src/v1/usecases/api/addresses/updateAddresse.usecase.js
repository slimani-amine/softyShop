"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddressUseCase = exports.updateAddressUseCaseBase = void 0;
const exceptions_1 = require("../../../core/errors/exceptions");
const addresses_repository_1 = require("../../../data/repositories/addresses.repository");
const updateAddressUseCaseBase = (addressRepository) => async (address, updatePayload) => {
    console.log("🚀 ~ updatePayload:", updatePayload);
    const updatedAddress = await addressRepository.updateAddress(address, updatePayload);
    if (!updatedAddress) {
        exceptions_1.exceptionService.notFoundException({
            message: "Address not found",
        });
    }
    return updatedAddress;
};
exports.updateAddressUseCaseBase = updateAddressUseCaseBase;
exports.updateAddressUseCase = (0, exports.updateAddressUseCaseBase)(addresses_repository_1.addressRepo);
//# sourceMappingURL=updateAddresse.usecase.js.map