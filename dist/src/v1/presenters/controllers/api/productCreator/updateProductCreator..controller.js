"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductCreatorController = exports.updateProductCreatorControllerBase = void 0;
const productCreator_repository_1 = require("../../../../data/repositories/productCreator.repository");
const updateProductCreator_usecase_1 = require("../../../../usecases/api/productCreator/updateProductCreator.usecase");
const updateProductCreatorControllerBase = (updateProductCreatorUseCase) => async (req, res, next) => {
    try {
        const productCreatorId = req.params.productCreatorId;
        const productCreator = await productCreator_repository_1.productCreatorRepo.findOne({ where: { id: productCreatorId } });
        if (!productCreator) {
            return res.status(404).json({
                message: "Product Creator not found",
            });
        }
        const updatePayload = req.body;
        const result = await updateProductCreatorUseCase(productCreator, updatePayload);
        if (!result) {
            return res.status(404).json({
                message: "Product Creator not found",
            });
        }
        res.status(201).send({
            message: "Product Creator updated successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateProductCreatorControllerBase = updateProductCreatorControllerBase;
exports.updateProductCreatorController = (0, exports.updateProductCreatorControllerBase)(updateProductCreator_usecase_1.updateProductCreatorUseCase);
//# sourceMappingURL=updateProductCreator..controller.js.map