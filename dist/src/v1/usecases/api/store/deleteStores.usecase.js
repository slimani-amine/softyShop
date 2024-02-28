"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStoreUseCase = exports.deleteStoreUseCaseBase = void 0;
const store_reposotory_1 = require("../../../data/repositories/store.reposotory");
const deleteStoreUseCaseBase = (dependencies) => async (queryParams) => {
    const storesFound = await dependencies.storeRepo.deleteStore(queryParams.id);
    return storesFound;
};
exports.deleteStoreUseCaseBase = deleteStoreUseCaseBase;
exports.deleteStoreUseCase = (0, exports.deleteStoreUseCaseBase)({ storeRepo: store_reposotory_1.storeRepo });
//# sourceMappingURL=deleteStores.usecase.js.map