"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneStoreUseCase = exports.getOneStoreUseCaseBase = void 0;
const store_reposotory_1 = require("../../../data/repositories/store.reposotory");
const getOneStoreUseCaseBase = (dependencies) => async (queryParams) => {
    console.log("🚀 ~ queryParams:", queryParams);
    const storesFound = await dependencies.storeRepo.findOne({ where: { id: queryParams.id } });
    return storesFound;
};
exports.getOneStoreUseCaseBase = getOneStoreUseCaseBase;
exports.getOneStoreUseCase = (0, exports.getOneStoreUseCaseBase)({ storeRepo: store_reposotory_1.storeRepo });
//# sourceMappingURL=getOneStore.usecase.js.map