"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStoresController = exports.deleteStoresControllerBase = void 0;
const deleteStores_usecase_1 = require("../../../../usecases/api/store/deleteStores.usecase");
const deleteStoresControllerBase = (deleteStoreUseCase) => async (req, res, next) => {
    try {
        const result = await deleteStoreUseCase(req === null || req === void 0 ? void 0 : req.params);
        res.status(200).send({
            message: 'success',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteStoresControllerBase = deleteStoresControllerBase;
exports.deleteStoresController = (0, exports.deleteStoresControllerBase)(deleteStores_usecase_1.deleteStoreUseCase);
//# sourceMappingURL=deleteStore.controller.js.map