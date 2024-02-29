"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatecategoryController = exports.updatecategoryControllerBase = void 0;
const category_repository_1 = require("../../../../data/repositories/category.repository");
const updateCategory_usecase_1 = require("../../../../usecases/api/category/updateCategory.usecase");
const updatecategoryControllerBase = (updatecategoryUseCase) => async (req, res, next) => {
    try {
        const categoryId = req.params.categoryId;
        const category = await category_repository_1.categoryRepo.findOne({
            where: { id: categoryId },
        });
        const updatePayload = req.body;
        const result = await updatecategoryUseCase(category, updatePayload);
        res.status(201).send({
            message: "category updated successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updatecategoryControllerBase = updatecategoryControllerBase;
exports.updatecategoryController = (0, exports.updatecategoryControllerBase)(updateCategory_usecase_1.updateCategoryUseCase);
//# sourceMappingURL=updateCategory.controller.js.map