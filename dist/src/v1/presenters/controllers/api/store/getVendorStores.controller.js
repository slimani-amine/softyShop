"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVendorStoresController = exports.getVendorStoresControllerBase = void 0;
const getVendorStores_usecase_1 = require("../../../../usecases/api/store/getVendorStores.usecase");
const getVendorStoresControllerBase = (getVendorStoresUseCase) => async (req, res, next) => {
    console.log(req === null || req === void 0 ? void 0 : req.params);
    const userId = req.user.id;
    try {
        const result = await getVendorStoresUseCase({ userId });
        res.status(200).send({
            message: "success",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getVendorStoresControllerBase = getVendorStoresControllerBase;
exports.getVendorStoresController = (0, exports.getVendorStoresControllerBase)(getVendorStores_usecase_1.getVendorStoresUseCase);
//# sourceMappingURL=getVendorStores.controller.js.map