"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserCartProductController = exports.getUserCartProductControllerBase = void 0;
const getUserCartProduct_usecase_1 = require("../../../../usecases/api/cartProduct/getUserCartProduct.usecase");
const getUserCartProductControllerBase = (getUserCartProductUseCase) => async (req, res, next) => {
    try {
        const cartId = req.params.cartId;
        const result = await getUserCartProductUseCase({ cartId });
        res.status(200).send({
            message: "success",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getUserCartProductControllerBase = getUserCartProductControllerBase;
exports.getUserCartProductController = (0, exports.getUserCartProductControllerBase)(getUserCartProduct_usecase_1.getUserCartProductUseCase);
//# sourceMappingURL=getUserCartProduct.controller.js.map