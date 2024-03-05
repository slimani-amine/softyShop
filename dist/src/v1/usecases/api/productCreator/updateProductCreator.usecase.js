"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductCreatorUseCase = exports.updateProductCreatorUseCaseBase = void 0;
const productCreator_repository_1 = require("../../../data/repositories/productCreator.repository");
const updateProductCreatorUseCaseBase = (productCreatorRepository) => async (productCreator, updatePayload) => {
    const updatedProductCreator = await productCreatorRepository.updateProductCreator(productCreator, updatePayload);
    return updatedProductCreator;
};
exports.updateProductCreatorUseCaseBase = updateProductCreatorUseCaseBase;
exports.updateProductCreatorUseCase = (0, exports.updateProductCreatorUseCaseBase)(productCreator_repository_1.productCreatorRepo);
//# sourceMappingURL=updateProductCreator.usecase.js.map