"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishStoreUseCase = exports.publishStoreUseCaseBase = void 0;
const store_repository_1 = require("../../../data/repositories/store.repository");
const publishStoreUseCaseBase = (storeRepository) => async (store, updatePayload) => {
    const updatedStore = await storeRepository.updateStore(store, {
        isPublished: updatePayload.isPublished,
    });
    return updatedStore;
};
exports.publishStoreUseCaseBase = publishStoreUseCaseBase;
exports.publishStoreUseCase = (0, exports.publishStoreUseCaseBase)(store_repository_1.storeRepo);
//# sourceMappingURL=publishStore.usecase.js.map