"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProductUseCase = exports.getAllProductUseCaseBase = void 0;
const product_repository_1 = require("../../../data/repositories/product.repository");
const getAllProductUseCaseBase = (dependencies) => async (queryParams) => {
    const productsFound = await dependencies.productRepo.findAll({
        relations: { category: true },
        where: queryParams,
        select: {
            category: { name: true },
        },
    });
    return productsFound;
};
exports.getAllProductUseCaseBase = getAllProductUseCaseBase;
exports.getAllProductUseCase = (0, exports.getAllProductUseCaseBase)({
    productRepo: product_repository_1.productRepo,
});
//# sourceMappingURL=getAllProducts.usecase.js.map