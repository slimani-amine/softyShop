"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBrandUseCase = exports.deleteBrandUseCaseBase = void 0;
const brand_repository_1 = require("../../../data/repositories/brand.repository");
const exceptions_1 = require("../../../core/errors/exceptions");
const deleteBrandUseCaseBase = (dependencies) => async (queryParams) => {
    const brand = await dependencies.brandRepo.findOne({
        where: { id: queryParams.id },
    });
    if (!brand) {
        exceptions_1.exceptionService.notFoundException({
            message: "Brand not found",
        });
    }
    const brandsFound = await dependencies.brandRepo.deleteBrand(brand);
    return brandsFound;
};
exports.deleteBrandUseCaseBase = deleteBrandUseCaseBase;
exports.deleteBrandUseCase = (0, exports.deleteBrandUseCaseBase)({
    brandRepo: brand_repository_1.brandRepo,
});
//# sourceMappingURL=deleteBrand.usecase.js.map