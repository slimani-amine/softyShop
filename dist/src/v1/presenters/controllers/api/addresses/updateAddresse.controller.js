"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddressController = exports.updateAddressControllerBase = void 0;
const addresses_repository_1 = require("../../../../data/repositories/addresses.repository");
const updateAddresse_usecase_1 = require("../../../../usecases/api/addresses/updateAddresse.usecase");
const updateAddressControllerBase = (updateAddressUseCase) => async (req, res, next) => {
    try {
        const addressId = req.params.addressId;
        const address = await addresses_repository_1.addressRepo.findOne({ where: { id: addressId } });
        const updatePayload = req.body;
        const result = await updateAddressUseCase(address, updatePayload);
        res.status(201).send({
            message: "Address updated successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateAddressControllerBase = updateAddressControllerBase;
exports.updateAddressController = (0, exports.updateAddressControllerBase)(updateAddresse_usecase_1.updateAddressUseCase);
//# sourceMappingURL=updateAddresse.controller.js.map