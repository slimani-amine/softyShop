"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoreProductCreatorUseCase = exports.getStoreProductCreatorUseCaseBase = void 0;
const productCreator_repository_1 = require("../../../data/repositories/productCreator.repository");
const getStoreProductCreatorUseCaseBase = (dependencies) => async (queryParams) => {
    const storeId = queryParams;
    const StoreProductCreators = (await dependencies.productCreatorRepo.getStoreProductCreators(storeId));
    return StoreProductCreators;
};
exports.getStoreProductCreatorUseCaseBase = getStoreProductCreatorUseCaseBase;
exports.getStoreProductCreatorUseCase = (0, exports.getStoreProductCreatorUseCaseBase)({
    productCreatorRepo: productCreator_repository_1.productCreatorRepo,
});
//# sourceMappingURL=getStoreProductCreators.usecase.js.map