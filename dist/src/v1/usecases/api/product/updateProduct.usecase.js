"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductUseCase = exports.updateProductUseCaseBase = void 0;
const product_repository_1 = require("../../../data/repositories/product.repository");
const updateProductUseCaseBase = (productRepository) => async (product, updatePayload) => {
    const updatedProduct = await productRepository.updateProduct(product, updatePayload);
    return updatedProduct;
};
exports.updateProductUseCaseBase = updateProductUseCaseBase;
exports.updateProductUseCase = (0, exports.updateProductUseCaseBase)(product_repository_1.productRepo);
//# sourceMappingURL=updateProduct.usecase.js.map