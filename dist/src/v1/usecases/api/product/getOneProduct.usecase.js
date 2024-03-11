"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneProductUseCase = exports.getOneProductUseCaseBase = void 0;
const product_repository_1 = require("../../../data/repositories/product.repository");
const exceptions_1 = require("../../../core/errors/exceptions");
const getStoreProducts_usecase_1 = require("./getStoreProducts.usecase");
const getOneProductUseCaseBase = (dependencies) => async (queryParams) => {
    queryParams.storeId = queryParams.id;
    const storeProduct = await (0, getStoreProducts_usecase_1.getStoreProductUseCase)({
        storeId: queryParams.storeId,
    });
    console.log("🚀 ~ storeProduct:", storeProduct);
    if (!storeProduct) {
        exceptions_1.exceptionService.notFoundException({
            message: "there is no product in this store",
        });
    }
    const product = storeProduct.filter((product) => {
        console.log(product.id == queryParams.productId);
        return product.id == queryParams.productId;
    });
    console.log("🚀 ~ product ~ product:", product);
    if (product.length === 0) {
        exceptions_1.exceptionService.notFoundException({
            message: `there is no product in this store with this id ${queryParams.productId}`,
        });
        return;
    }
    else {
        const productFound = await dependencies.productRepo.findOne({
            relations: {
                category: true,
                store: true,
                brand: true,
            },
            where: { id: queryParams.productId, store: { id: queryParams.id } },
            select: {
                category: {
                    id: true,
                    name: true,
                },
                brand: {
                    id: true,
                    name: true,
                },
                store: {
                    id: true,
                    name: true,
                },
            },
        });
        if (!productFound) {
            exceptions_1.exceptionService.notFoundException({
                message: "Product not found",
            });
        }
        return productFound;
    }
};
exports.getOneProductUseCaseBase = getOneProductUseCaseBase;
exports.getOneProductUseCase = (0, exports.getOneProductUseCaseBase)({
    productRepo: product_repository_1.productRepo,
});
//# sourceMappingURL=getOneProduct.usecase.js.map