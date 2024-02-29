"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoryUseCase = exports.updateCategoryUseCaseBase = void 0;
const category_repository_1 = require("../../../data/repositories/category.repository");
const updateCategoryUseCaseBase = (CategoryRepository) => async (Category, updatePayload) => {
    const updatedCategory = await CategoryRepository.updateCategory(Category, updatePayload);
    return updatedCategory;
};
exports.updateCategoryUseCaseBase = updateCategoryUseCaseBase;
exports.updateCategoryUseCase = (0, exports.updateCategoryUseCaseBase)(category_repository_1.categoryRepo);
//# sourceMappingURL=updateMethod.usecase.js.map