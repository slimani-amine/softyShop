"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductBrandsUseCase = exports.getProductBrandsUseCaseBase = void 0;
const brand_repository_1 = require("../../../data/repositories/brand.repository");
const getProductBrandsUseCaseBase = (dependencies) => async (queryParams) => {
    const { storeId, productId } = queryParams;
    const productBrands = (await dependencies.brandsRepo.getProductBrands({
        storeId,
        productId,
    }));
    return productBrands;
};
exports.getProductBrandsUseCaseBase = getProductBrandsUseCaseBase;
exports.getProductBrandsUseCase = (0, exports.getProductBrandsUseCaseBase)({
    brandsRepo: brand_repository_1.brandRepo,
});
//# sourceMappingURL=getProductBrands.usecase.js.map