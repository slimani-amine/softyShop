"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductFromCartController = exports.deleteProductFromCartControllerBase = void 0;
const deleteProductFromCart_usecase_1 = require("../../../../usecases/api/cartProduct/deleteProductFromCart.usecase");
const deleteProductFromCartControllerBase = (deleteProductFromCartUseCase) => async (req, res, next) => {
    try {
        const result = await deleteProductFromCartUseCase(req === null || req === void 0 ? void 0 : req.params);
        res.status(200).send({
            message: "success",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteProductFromCartControllerBase = deleteProductFromCartControllerBase;
exports.deleteProductFromCartController = (0, exports.deleteProductFromCartControllerBase)(deleteProductFromCart_usecase_1.deleteProductFromCartUseCase);
//# sourceMappingURL=deleteProductFromCart.controller.js.map