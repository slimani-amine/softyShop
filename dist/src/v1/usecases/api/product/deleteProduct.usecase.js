"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductUseCase = exports.deleteProductUseCaseBase = void 0;
const store_repository_1 = require("../../../data/repositories/store.repository");
const exceptions_1 = require("../../../core/errors/exceptions");
const product_repository_1 = require("../../../data/repositories/product.repository");
const deleteProductUseCaseBase = (dependencies) => async (queryParams) => {
    const store = await store_repository_1.storeRepo.findOne({ where: { id: queryParams.id } });
    if (!store) {
        exceptions_1.exceptionService.notFoundException({
            message: "store not found",
        });
    }
    const product = await dependencies.productRepo.findOne({
        where: { id: queryParams.productId },
    });
    if (!product) {
        exceptions_1.exceptionService.notFoundException({
            message: "product not found",
        });
    }
    const productFound = await dependencies.productRepo.deleteProduct(product);
    return productFound;
};
exports.deleteProductUseCaseBase = deleteProductUseCaseBase;
exports.deleteProductUseCase = (0, exports.deleteProductUseCaseBase)({
    productRepo: product_repository_1.productRepo,
});
//# sourceMappingURL=deleteProduct.usecase.js.map