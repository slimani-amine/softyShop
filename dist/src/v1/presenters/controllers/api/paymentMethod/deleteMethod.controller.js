"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryController = exports.deleteCategoryControllerBase = void 0;
const deleteCategory_usecase_1 = require("../../../../usecases/api/category/deleteCategory.usecase");
const deleteCategoryControllerBase = (deleteCategoryUseCase) => async (req, res, next) => {
    try {
        const result = await deleteCategoryUseCase(req === null || req === void 0 ? void 0 : req.params);
        res.status(200).send({
            message: "success",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteCategoryControllerBase = deleteCategoryControllerBase;
exports.deleteCategoryController = (0, exports.deleteCategoryControllerBase)(deleteCategory_usecase_1.deleteCategoryUseCase);
//# sourceMappingURL=deleteMethod.controller.js.map