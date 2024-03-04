"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneProductController = exports.getOneProductControllerBase = void 0;
const getOneProduct_usecase_1 = require("../../../../usecases/api/product/getOneProduct.usecase");
const getOneProductControllerBase = (getOneProductUseCase) => async (req, res, next) => {
    console.log(req === null || req === void 0 ? void 0 : req.params);
    try {
        const result = await getOneProductUseCase(req === null || req === void 0 ? void 0 : req.params);
        res.status(200).send({
            message: "Success",
            data: result,
        });
    }
    catch (err) {
        res.status(404).send({
            message: "Product not found",
            data: null,
        });
    }
};
exports.getOneProductControllerBase = getOneProductControllerBase;
exports.getOneProductController = (0, exports.getOneProductControllerBase)(getOneProduct_usecase_1.getOneProductUseCase);
//# sourceMappingURL=getOneProducts.controller.js.map