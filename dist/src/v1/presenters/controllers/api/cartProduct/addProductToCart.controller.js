"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductToCartController = exports.addProductToCartControllerBase = void 0;
const exceptions_1 = require("../../../../core/errors/exceptions");
const addProductToCart_usecase_1 = require("../../../../usecases/api/cartProduct/addProductToCart.usecase");
const addProductToCartControllerBase = (addProductToCartUseCase) => async (req, res, next) => {
    var _a;
    const cartId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.cartId;
    try {
        if (!cartId) {
            exceptions_1.exceptionService.notFoundException({
                message: "you have not a cart ",
            });
        }
        req.body.cartId = cartId;
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