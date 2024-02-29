"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddressesController = exports.deleteAddressesControllerBase = void 0;
const deleteAddresse_usecase_1 = require("../../../../usecases/api/addresses/deleteAddresse.usecase");
const deleteAddressesControllerBase = (deleteAddressUseCase) => async (req, res, next) => {
    try {
        const result = await deleteAddressUseCase(req === null || req === void 0 ? void 0 : req.params);
        res.status(200).send({
            message: "Success",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteAddressesControllerBase = deleteAddressesControllerBase;
exports.deleteAddressesController = (0, exports.deleteAddressesControllerBase)(deleteAddresse_usecase_1.deleteAddressUseCase);
//# sourceMappingURL=deleteAddresse.controller.js.map