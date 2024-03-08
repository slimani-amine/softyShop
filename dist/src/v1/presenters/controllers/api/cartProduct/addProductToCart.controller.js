"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductToCartController = exports.addProductToCartControllerBase = void 0;
const addProductToCart_usecase_1 = require("../../../../usecases/api/cartProduct/addProductToCart.usecase");
const addProductToCartControllerBase = (addProductToCartUseCase) => async (req, res, next) => {
    try {
        req.body.cartId = req.params.cartId;
        const result = await addProductToCartUseCase(req.body);
        res.status(201).send({
            message: "Product added to cart successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.addProductToCartControllerBase = addProductToCartControllerBase;
exports.addProductToCartController = (0, exports.addProductToCartControllerBase)(addProductToCart_usecase_1.addProductToCartUseCase);
//# sourceMappingURL=addProductToCart.controller.js.map