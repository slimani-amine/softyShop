"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoreProductUseCase = exports.getStoreProductUseCaseBase = void 0;
const Product_repository_1 = require("../../../data/repositories/Product.repository");
const store_repository_1 = require("../../../data/repositories/store.repository");
const exceptions_1 = require("../../../core/errors/exceptions");
const getStoreProductUseCaseBase = (dependencies) => async (queryParams) => {
    const store = await store_repository_1.storeRepo.findOne({
        where: { id: queryParams.storeId },
    });
    if (!store) {
        exceptions_1.exceptionService.notFoundException({
            message: "store not found",
        });
    }
    const productsFound = await dependencies.productRepo.findAll({
        where: { store: store },
        cache: true,
    });
    return productsFound;
};
exports.getStoreProductUseCaseBase = getStoreProductUseCaseBase;
exports.getStoreProductUseCase = (0, exports.getStoreProductUseCaseBase)({
    productRepo: Product_repository_1.productRepo,
});
//# sourceMappingURL=getStoreProducts.usecase.js.map