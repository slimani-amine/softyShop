"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductFromCartUseCase = exports.deleteProductFromCartUseCaseBase = void 0;
const cartProduct_repository_1 = require("../../../data/repositories/cartProduct.repository");
const exceptions_1 = require("../../../core/errors/exceptions");
const deleteProductFromCartUseCaseBase = (dependencies = {
    cartProductRepo: cartProduct_repository_1.cartProductRepo,
}) => async (params) => {
    const product = await dependencies.cartProductRepo.findOne({
        where: { product: { id: params.productId } },
    });
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