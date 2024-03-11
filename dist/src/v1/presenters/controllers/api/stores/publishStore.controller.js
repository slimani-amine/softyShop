"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishStoreController = exports.publishStoreControllerBase = void 0;
const store_repository_1 = require("../../../../data/repositories/store.repository");
const publishStore_usecase_1 = require("../../../../usecases/api/store/publishStore.usecase");
const exceptions_1 = require("../../../../core/errors/exceptions");
const publishStoreControllerBase = (publishStoreUseCase) => async (req, res, next) => {
    try {
        const storeId = req.params.id;
        const store = await store_repository_1.storeRepo.findOne({ where: { id: storeId } });
        if (!store) {
            exceptions_1.exceptionService.badRequestException({
                message: "Store not found",
            });
        }
        const updatePayload = req.body;
        if (store.isPublished === updatePayload.isPublished) {
            exceptions_1.exceptionService.badRequestException({
                message: `isPublished already set ${updatePayload.isPublished}`,
            });
        }
        const result = await publishStoreUseCase(store, updatePayload);
        res.status(201).send({
            message: "Store updated successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.publishStoreControllerBase = publishStoreControllerBase;
exports.publishStoreController = (0, exports.publishStoreControllerBase)(publishStore_usecase_1.publishStoreUseCase);
//# sourceMappingURL=publishStore.controller.js.map