"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBrandUseCase = exports.updateBrandUseCaseBase = void 0;
const brand_repository_1 = require("../../../data/repositories/brand.repository");
const updateBrandUseCaseBase = (brandRepository) => async (brand, updatePayload) => {
    const updatedBrand = await brandRepository.updateBrand(brand, updatePayload);
    return updatedBrand;
};
exports.updateBrandUseCaseBase = updateBrandUseCaseBase;
exports.updateBrandUseCase = (0, exports.updateBrandUseCaseBase)(brand_repository_1.brandRepo);
//# sourceMappingURL=updateBrand.usecase.js.map