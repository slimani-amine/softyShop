"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategoryController = exports.createCategoryControllerBase = void 0;
const createCategory_usecase_1 = require("../../../../usecases/api/category/createCategory.usecase");
const createCategoryControllerBase = (createCategoryUseCase) => async (req, res, next) => {
    try {
        const result = await createCategoryUseCase(req.body);
        res.status(201).send({
            message: "Category created successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.createCategoryControllerBase = createCategoryControllerBase;
exports.createCategoryController = (0, exports.createCategoryControllerBase)(createCategory_usecase_1.createCategoryUseCase);
//# sourceMappingURL=createCategory.controller.js.map