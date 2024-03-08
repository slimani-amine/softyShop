"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartUseCase = exports.getCartUseCaseBase = void 0;
const cart_repsitory_1 = require("../../../data/repositories/cart.repsitory");
const getCartUseCaseBase = (dependencies) => async (queryParams) => {
    const { cartId } = queryParams;
    const cart = (await dependencies.cartRepo.findOne({
        where: {
            id: cartId.toString(),
        },
    }));
    return cart;
};
exports.getCartUseCaseBase = getCartUseCaseBase;
exports.getCartUseCase = (0, exports.getCartUseCaseBase)({
    cartRepo: cart_repsitory_1.cartRepo,
});
//# sourceMappingURL=getCart.usecase.js.map