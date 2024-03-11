"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserCartProductUseCase = exports.getUserCartProductUseCaseBase = void 0;
const cart_repsitory_1 = require("../../../data/repositories/cart.repsitory");
const cartProduct_repository_1 = require("../../../data/repositories/cartProduct.repository");
const getUserCartProductUseCaseBase = (dependencies) => async (queryParams) => {
    const { cartId } = queryParams;
    const cartProduct = await dependencies.cartProductRepo.findAll({
        relations: {
            product: true,
        },
        where: {
            cart: { id: cartId },
        },
    });
    let sommeQuantities = 0;
    for (let i = 0; i < cartProduct.length; i++) {
        sommeQuantities += cartProduct[i].quantity;
    }
    let sommePrice = 0;
    for (let i = 0; i < cartProduct.length; i++) {
        sommePrice += cartProduct[i].product.price * cartProduct[i].quantity;
    }
    const cart = (await cart_repsitory_1.cartRepo.findOne({
        where: {
            id: cartId.toString(),
        },
    }));
    const newCart = await cart_repsitory_1.cartRepo.updateCart(cart, {
        totalQuantity: sommeQuantities,
        totalAmount: sommePrice,
    });
    return [newCart, cartProduct];
};
exports.getUserCartProductUseCaseBase = getUserCartProductUseCaseBase;
exports.getUserCartProductUseCase = (0, exports.getUserCartProductUseCaseBase)({
    cartProductRepo: cartProduct_repository_1.cartProductRepo,
});
//# sourceMappingURL=getUserCartProduct.usecase.js.map