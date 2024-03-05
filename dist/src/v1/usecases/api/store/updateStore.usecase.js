"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStoreUseCase = exports.updateStoreUseCaseBase = void 0;
const store_repository_1 = require("../../../data/repositories/store.repository");
const updateStoreUseCaseBase = (storeRepository) => async (store, updatePayload) => {
    if (updatePayload.socialMediaLinks) {
        updatePayload.socialMediaLinks = JSON.stringify(updatePayload.socialMediaLinks);
    }
    if (updatePayload.position) {
        updatePayload.position = JSON.stringify(updatePayload.position);
    }
    const updatedStore = await storeRepository.updateStore(store, updatePayload);
    return updatedStore;
};
exports.updateStoreUseCaseBase = updateStoreUseCaseBase;
exports.updateStoreUseCase = (0, exports.updateStoreUseCaseBase)(store_repository_1.storeRepo);
//# sourceMappingURL=updateStore.usecase.js.map