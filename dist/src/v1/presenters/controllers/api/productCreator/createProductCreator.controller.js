"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductCreatorController = exports.createProductCreatorControllerBase = void 0;
const createProductCreator_usecase_1 = require("../../../../usecases/api/productCreator/createProductCreator.usecase");
const createProductCreatorControllerBase = (createProductCreatorUseCase) => async (req, res, next) => {
    req.body.store_id = req.params.id;
    try {
        const result = await createProductCreatorUseCase(req === null || req === void 0 ? void 0 : req.body);
        return res.status(201).json({
            message: "Product Creator added successfully",
            data: {
                productCreator: result.productCreator,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createProductCreatorControllerBase = createProductCreatorControllerBase;
exports.createProductCreatorController = (0, exports.createProductCreatorControllerBase)(createProductCreator_usecase_1.createProductCreatorUseCase);
//# sourceMappingURL=createProductCreator.controller.js.map