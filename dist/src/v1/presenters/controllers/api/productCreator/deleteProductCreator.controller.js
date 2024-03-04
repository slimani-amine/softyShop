"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductCreatorController = exports.deleteProductCreatorControllerBase = void 0;
const deleteProductCreator_usecase_1 = require("../../../../usecases/api/productCreator/deleteProductCreator.usecase");
const deleteProductCreatorControllerBase = (deleteProductCreatorUseCase) => async (req, res, next) => {
    try {
        const result = await deleteProductCreatorUseCase(req === null || req === void 0 ? void 0 : req.params);
        res.status(200).send({
            message: "Success",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteProductCreatorControllerBase = deleteProductCreatorControllerBase;
exports.deleteProductCreatorController = (0, exports.deleteProductCreatorControllerBase)(deleteProductCreator_usecase_1.deleteProductCreatorUseCase);
//# sourceMappingURL=deleteProductCreator.controller.js.map