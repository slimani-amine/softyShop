"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartProductRepo = exports.cartProductRepoBase = void 0;
const cartProduct_entity_1 = require("../orm_models/cartProduct.entity");
const product_entity_1 = require("../orm_models/product.entity");
const cart_entity_1 = require("../orm_models/cart.entity");
const exceptions_1 = require("../../core/errors/exceptions");
const connection_1 = require("../connection");
const cart_repsitory_1 = require("./cart.repsitory");
const cartProductRepoBase = (dbConnection) => ({
    manager: dbConnection.manager,
    async findOne(findData) {
        const cartProduct = await this.manager.findOne(cartProduct_entity_1.CartProductEntity, findData);
        return cartProduct;
    },
    async findAll(findData) {
        const cartProducts = await this.manager.find(cartProduct_entity_1.CartProductEntity, findData);
        return cartProducts;
    },
    async createCartProduct(payload) {
        const product = await this.manager.findOne(product_entity_1.ProductEntity, {
            where: { id: payload.productId },
        });
        if (!product) {
            exceptions_1.exceptionService.notFoundException({
                message: "Product not found",
            });
        }
        const cart = await this.manager.findOne(cart_entity_1.CartEntity, {
            where: { id: payload.cartId },
        });
        if (!cart) {
            exceptions_1.exceptionService.notFoundException({
                message: "Cart not found",
            });
        }
        const sommeQuantities = payload.quantity * 1 + cart.totalQuantity * 1;
        const sommePrice = product.price * 1 + cart.totalAmount * 1;
        await cart_repsitory_1.cartRepo.updateCart(cart, {
            totalQuantity: sommeQuantities,
            totalAmount: sommePrice,
        });
        const cartProduct = this.manager.create(cartProduct_entity_1.CartProductEntity, {
            quantity: payload.quantity,
            product: product,
            cart: cart,
        });
        const result = await this.manager.save(cartProduct_entity_1.CartProductEntity, cartProduct);
        return result;
    },
    async deleteCartProduct(cartProduct) {
        const result = await this.manager.softDelete(cartProduct_entity_1.CartProductEntity, {
            id: cartProduct.id,
        });
        return result !== null ? 1 : 0;
    },
    async updateCartProduct(cartProduct, payload) {
        await this.manager.update(cartProduct_entity_1.CartProductEntity, {
            id: cartProduct.id,
        }, payload);
        const updatedProductCart = await this.manager.findOne(cartProduct_entity_1.CartProductEntity, {
            where: {
                id: cartProduct.id,
            },
        });
        return updatedProductCart;
    },
});
exports.cartProductRepoBase = cartProductRepoBase;
exports.cartProductRepo = (0, exports.cartProductRepoBase)(connection_1.default);
//# sourceMappingURL=cartProduct.repository.js.map