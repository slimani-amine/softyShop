"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllStoresController = exports.getAllStoresControllerBase = void 0;
const getAllStores_usecase_1 = require("../../../../usecases/api/store/getAllStores.usecase");
const getAllStoresControllerBase = (getAllStoreUseCase) => async (req, res, next) => {
    try {
        const result = await getAllStoreUseCase(req === null || req === void 0 ? void 0 : req.query);
        res.status(200).send({
            message: 'success',
            data: result.docs,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getAllStoresControllerBase = getAllStoresControllerBase;
exports.getAllStoresController = (0, exports.getAllStoresControllerBase)(getAllStores_usecase_1.getAllStoreUseCase);
//# sourceMappingURL=getAllStores.controller%20copy.js.map