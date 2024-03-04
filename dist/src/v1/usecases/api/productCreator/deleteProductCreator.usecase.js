"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductCreatorUseCase = exports.deleteProductCreatorUseCaseBase = void 0;
const exceptions_1 = require("../../../core/errors/exceptions");
const productCreator_repository_1 = require("../../../data/repositories/productCreator.repository");
const deleteProductCreatorUseCaseBase = (dependencies) => async (queryParams) => {
    const productCreator = await dependencies.productCreatorRepo.findOne({
        where: { id: queryParams.productCreatorId },
    });
    if (!productCreator) {
        exceptions_1.exceptionService.notFoundException({
            message: "Product Creator not found",
        });
    }
    const productCreatorsFound = await dependencies.productCreatorRepo.deleteProductCreator(productCreator);
    return productCreatorsFound;
};
exports.deleteProductCreatorUseCaseBase = deleteProductCreatorUseCaseBase;
exports.deleteProductCreatorUseCase = (0, exports.deleteProductCreatorUseCaseBase)({
    productCreatorRepo: productCreator_repository_1.productCreatorRepo,
});
//# sourceMappingURL=deleteProductCreator.usecase.js.map