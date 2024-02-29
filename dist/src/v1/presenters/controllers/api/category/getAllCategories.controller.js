"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategoryController = exports.getAllCategoriesControllerBase = void 0;
const getAllCategories_usecase_1 = require("../../../../usecases/api/category/getAllCategories.usecase");
const getAllCategoriesControllerBase = (getAllCategoriesUseCase) => async (req, res, next) => {
    try {
        const result = await getAllCategoriesUseCase(req === null || req === void 0 ? void 0 : req.query);
        res.status(200).send({
            message: "success",
            data: result.docs,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getAllCategoriesControllerBase = getAllCategoriesControllerBase;
exports.getAllCategoryController = (0, exports.getAllCategoriesControllerBase)(getAllCategories_usecase_1.getAllCategoriesUseCase);
//# sourceMappingURL=getAllCategories.controller.js.map