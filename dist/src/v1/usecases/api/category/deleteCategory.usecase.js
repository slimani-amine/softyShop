"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryUseCase = exports.deleteCategoryUseCaseBase = void 0;
const exceptions_1 = require("../../../core/errors/exceptions");
const category_repository_1 = require("../../../data/repositories/category.repository");
const deleteCategoryUseCaseBase = (dependencies = {
    categoryRepo: category_repository_1.categoryRepo,
}) => async (params) => {
    const category = await dependencies.categoryRepo.findOne({
        where: { id: params.id },
    });
    if (!category) {
        exceptions_1.exceptionService.notFoundException({
            message: "Category not found",
        });
    }
    const result = await dependencies.categoryRepo.deleteCategory(category);
    return {
        success: result === 1,
    };
};
exports.deleteCategoryUseCaseBase = deleteCategoryUseCaseBase;
exports.deleteCategoryUseCase = (0, exports.deleteCategoryUseCaseBase)({
    categoryRepo: category_repository_1.categoryRepo,
});
//# sourceMappingURL=deleteCategory.usecase.js.map