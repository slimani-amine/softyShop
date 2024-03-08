"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategoriesUseCase = exports.getAllCategoriesUseCaseBase = void 0;
const category_repository_1 = require("../../../data/repositories/category.repository");
const getAllCategoriesUseCaseBase = (dependencies) => async (queryParams) => {
    const storesFound = await dependencies.categoryRepo.findAll({
        where: queryParams,
    });
    return storesFound;
};
exports.getAllCategoriesUseCaseBase = getAllCategoriesUseCaseBase;
exports.getAllCategoriesUseCase = (0, exports.getAllCategoriesUseCaseBase)({
    categoryRepo: category_repository_1.categoryRepo,
});
//# sourceMappingURL=getAllCategories.usecase.js.map