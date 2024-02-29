"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStoreController = exports.updateStoreControllerBase = void 0;
const store_repository_1 = require("../../../../data/repositories/store.repository");
const updateStore_usecase_1 = require("../../../../usecases/api/store/updateStore.usecase");
const updateStoreControllerBase = (updateStoreUseCase) => async (req, res, next) => {
    try {
        const storeId = req.params.storeId;
        const store = await store_repository_1.storeRepo.findOne({ where: { id: storeId } });
        const updatePayload = req.body;
        const result = await updateStoreUseCase(store, updatePayload);
        res.status(201).send({
            message: "Store updated successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateStoreControllerBase = updateStoreControllerBase;
exports.updateStoreController = (0, exports.updateStoreControllerBase)(updateStore_usecase_1.updateStoreUseCase);
//# sourceMappingURL=updateStore.controller.js.map