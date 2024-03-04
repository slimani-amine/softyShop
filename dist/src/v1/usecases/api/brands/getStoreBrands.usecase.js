"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoreBrandsUseCase = exports.getStoreBrandsUseCaseBase = void 0;
const brand_repository_1 = require("../../../data/repositories/brand.repository");
const getStoreBrandsUseCaseBase = (dependencies) => async (queryParams) => {
    const storeId = queryParams;
    const StoreBrands = (await dependencies.brandsRepo.getStoreBrands(storeId));
    return StoreBrands;
};
exports.getStoreBrandsUseCaseBase = getStoreBrandsUseCaseBase;
exports.getStoreBrandsUseCase = (0, exports.getStoreBrandsUseCaseBase)({
    brandsRepo: brand_repository_1.brandRepo,
});
//# sourceMappingURL=getStoreBrands.usecase.js.map