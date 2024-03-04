"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductController = exports.updateProductControllerBase = void 0;
const product_repository_1 = require("../../../../data/repositories/product.repository");
const updateProduct_usecase_1 = require("../../../../usecases/api/product/updateProduct.usecase");
const updateProductControllerBase = (updateProductUseCase) => async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const product = await product_repository_1.productRepo.findOne({ where: { id: productId } });
        const updatePayload = req.body;
        const result = await updateProductUseCase(product, updatePayload);
        res.status(201).send({
            message: "Product updated successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateProductControllerBase = updateProductControllerBase;
exports.updateProductController = (0, exports.updateProductControllerBase)(updateProduct_usecase_1.updateProductUseCase);
//# sourceMappingURL=updateProduct.controller.js.map