"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartController = exports.getCartControllerBase = void 0;
const getCart_usecase_1 = require("../../../../usecases/api/cart/getCart.usecase");
const getCartControllerBase = (getCartUseCase) => async (req, res, next) => {
    try {
        const cartId = req.user.cartId;
        console.log("🚀 ~ cartId:", cartId);
        if (!cartId) {
            res.status(404).send({
                message: "you have not a cart ",
            });
        }
        else {
            const result = await getCartUseCase({ cartId });
            res.status(200).send({
                message: "success",
                data: result,
            });
        }
    }
    catch (err) {
        next(err);
    }
};
exports.getCartControllerBase = getCartControllerBase;
exports.getCartController = (0, exports.getCartControllerBase)(getCart_usecase_1.getCartUseCase);
//# sourceMappingURL=getCart.controller.js.map