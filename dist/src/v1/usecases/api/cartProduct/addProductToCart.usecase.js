"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductToCartUseCase = exports.validateCreateCartProductPayload = exports.addProductToCartUseCaseBase = void 0;
const validate_schema_1 = require("../../../utils/validation/validate.schema");
const exceptions_1 = require("../../../core/errors/exceptions");
const cartProduct_repository_1 = require("../../../data/repositories/cartProduct.repository");
const createCartProduct_schema_1 = require("../../../presenters/schemas/cartProduct/createCartProduct.schema");
const addProductToCartUseCaseBase = (dependencies = {
    cartProductRepo: cartProduct_repository_1.cartProductRepo,
}) => async (payload) => {
    validateCreateCartProductPayload(payload);
    const existingCartProduct = await cartProduct_repository_1.cartProductRepo.findOne({
        where: {
            product: { id: payload.productId },
            cart: { id: payload.cartId },
        },
    });
    if (existingCartProduct) {
        exceptions_1.exceptionService.notFoundException({
            message: "This product is already in the cart",
        });
    }
    const cartProductCreated = await dependencies.cartProductRepo.createCartProduct({
        quantity: payload.quantity,
        productId: payload.productId,
        cartId: payload.cartId,
    });
    return {
        cartProduct: cartProductCreated,
    };
};
exports.addProductToCartUseCaseBase = addProductToCartUseCaseBase;
function validateCreateCartProductPayload(payload) {
    (0, validate_schema_1.trimAndValidateSchemaPayload)(createCartProduct_schema_1.default, payload);
    return payload;
}
exports.validateCreateCartProductPayload = validateCreateCartProductPayload;
exports.addProductToCartUseCase = (0, exports.addProductToCartUseCaseBase)();
//# sourceMappingURL=addProductToCart.usecase.js.map