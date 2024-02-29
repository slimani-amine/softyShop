"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneAddressUseCase = exports.getOneAddressUseCaseBase = void 0;
const exceptions_1 = require("../../../core/errors/exceptions");
const addresses_repository_1 = require("../../../data/repositories/addresses.repository");
const getOneAddressUseCaseBase = (dependencies) => async (queryParams) => {
    const addressFound = await dependencies.addressRepo.findOne({
        where: { id: queryParams.id },
    });
    if (!addressFound) {
        exceptions_1.exceptionService.notFoundException({
            message: "Address not found",
        });
    }
    return addressFound;
};
exports.getOneAddressUseCaseBase = getOneAddressUseCaseBase;
exports.getOneAddressUseCase = (0, exports.getOneAddressUseCaseBase)({
    addressRepo: addresses_repository_1.addressRepo,
});
//# sourceMappingURL=getOneAdresse.usecase.js.map