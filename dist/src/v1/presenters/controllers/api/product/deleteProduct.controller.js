"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductController = exports.deleteProductControllerBase = void 0;
const deleteProduct_usecase_1 = require("../../../../usecases/api/product/deleteProduct.usecase");
const deleteProductControllerBase = (deleteProductUseCase) => async (req, res, next) => {
    try {
        const result = await deleteProductUseCase(req === null || req === void 0 ? void 0 : req.params);
        res.status(200).send({
            message: "success",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteProductControllerBase = deleteProductControllerBase;
exports.deleteProductController = (0, exports.deleteProductControllerBase)(deleteProduct_usecase_1.deleteProductUseCase);
//# sourceMappingURL=deleteProduct.controller.js.map