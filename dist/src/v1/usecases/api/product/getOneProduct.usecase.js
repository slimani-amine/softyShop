"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneProductUseCase = exports.getOneProductUseCaseBase = void 0;
const product_repository_1 = require("../../../data/repositories/product.repository");
const exceptions_1 = require("../../../core/errors/exceptions");
const getOneProductUseCaseBase = (dependencies) => async (queryParams) => {
    const productFound = await dependencies.productRepo.findOne({
        where: { id: queryParams.productId },
    });
    if (!productFound) {
        exceptions_1.exceptionService.notFoundException({
            message: "Product not found",
        });
    }
    return productFound;
};
exports.getOneProductUseCaseBase = getOneProductUseCaseBase;
exports.getOneProductUseCase = (0, exports.getOneProductUseCaseBase)({
    productRepo: product_repository_1.productRepo,
});
//# sourceMappingURL=getOneProduct.usecase.js.map