"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllStoreUseCase = exports.getAllStoreUseCaseBase = void 0;
const store_reposotory_1 = require("../../../data/repositories/store.reposotory");
const getAllStoreUseCaseBase = (dependencies) => async (queryParams) => {
    console.log("🚀 ~ queryParams:", queryParams);
    const storesFound = await dependencies.storeRepo.findByQuery(queryParams);
    return storesFound;
};
exports.getAllStoreUseCaseBase = getAllStoreUseCaseBase;
exports.getAllStoreUseCase = (0, exports.getAllStoreUseCaseBase)({ storeRepo: store_reposotory_1.storeRepo });
//# sourceMappingURL=getAllStores.usecase.js.map