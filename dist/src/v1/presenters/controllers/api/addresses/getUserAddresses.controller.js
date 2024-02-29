"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAddressesController = exports.getUserAddressesControllerBase = void 0;
const getUserAddresses_usecase_1 = require("../../../../usecases/api/addresses/getUserAddresses.usecase");
const getUserAddressesControllerBase = (getUserAddressesUseCase) => async (req, res, next) => {
    const userId = req.user.id;
    try {
        const result = await getUserAddressesUseCase({ userId });
        res.status(200).send({
            message: "Success",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getUserAddressesControllerBase = getUserAddressesControllerBase;
exports.getUserAddressesController = (0, exports.getUserAddressesControllerBase)(getUserAddresses_usecase_1.getUserAddressesUseCase);
//# sourceMappingURL=getUserAddresses.controller.js.map