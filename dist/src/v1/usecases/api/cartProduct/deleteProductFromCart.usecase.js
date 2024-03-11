"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductFromCartUseCase = exports.deleteProductFromCartUseCaseBase = void 0;
const cartProduct_repository_1 = require("../../../data/repositories/cartProduct.repository");
const exceptions_1 = require("../../../core/errors/exceptions");
const cart_repsitory_1 = require("../../../data/repositories/cart.repsitory");
const deleteProductFromCartUseCaseBase = (dependencies = {
    cartProductRepo: cartProduct_repository_1.cartProductRepo,
}) => async (params) => {
    const cart = (await cart_repsitory_1.cartRepo.findOne({
        select: {
            cartProducts: true,
        },
        where: { id: params.cartId },
    }));
    if (!cart) {
        exceptions_1.exceptionService.notFoundException({
            message: "cart not found",
        });
    }
    const product = await dependencies.cartProductRepo.findOne({
        relations: {
            product: true,
        },
        where: { product: { id: params.productId } },
    });
    console.log("🚀 ~ product:", product);
    if (!product) {
        exceptions_1.exceptionService.notFoundException({
            message: "product not found",
        });
    }
    const result = await dependencies.cartProductRepo.deleteCartProduct(product);
    return {
        success: result === 1,
    };
};
exports.deleteProductFromCartUseCaseBase = deleteProductFromCartUseCaseBase;
exports.deleteProductFromCartUseCase = (0, exports.deleteProductFromCartUseCaseBase)({
    cartProductRepo: cartProduct_repository_1.cartProductRepo,
});
//# sourceMappingURL=deleteProductFromCart.usecase.js.map