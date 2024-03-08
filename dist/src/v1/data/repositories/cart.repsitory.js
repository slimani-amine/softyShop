"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRepo = exports.cartRepoBase = void 0;
const cart_entity_1 = require("../orm_models/cart.entity");
const cart_1 = require("../../domain/cart/cart");
const connection_1 = require("../connection");
const apiFeatures_util_1 = require("../../utils/querying/apiFeatures.util");
const cartRepoBase = (dbConnection) => ({
    manager: dbConnection.manager,
    async findOne(findData) {
        const cart = await this.manager.findOne(cart_entity_1.CartEntity, findData);
        console.log("🚀 ~ findOne ~ cart:", cart);
        return this.toDomainCart(cart);
    },
    async findAll(findData) {
        const carts = await this.manager.find(cart_entity_1.CartEntity, findData);
        return carts;
    },
    async createCart() {
        const cart = this.manager.create(cart_entity_1.CartEntity);
        const result = await this.manager.save(cart_entity_1.CartEntity, cart);
        return this.toDomainCart(result);
    },
    async deleteCart(cart) {
        const result = await this.manager.softDelete(cart_entity_1.CartEntity, {
            id: cart.id,
        });
        return result !== null ? 1 : 0;
    },
    async findByQuery(queryParams) {
        const result = await apiFeatures_util_1.ApiFeatures.generateSqlQuery(connection_1.default, "cart", queryParams, {});
        return {
            docs: this.toDomainCarts(result.docs),
            meta: result.meta,
        };
    },
    async updateCart(cart, payload) {
        await this.manager.update(cart_entity_1.CartEntity, {
            id: cart.id,
        }, payload);
        const updatedCart = await this.manager.findOne(cart_entity_1.CartEntity, {
            where: {
                id: cart.id,
            },
        });
        return this.toDomainCart(updatedCart);
    },
    toDomainCarts(carts) {
        const domainCarts = carts.map((prismaCart) => this.toDomainCart(prismaCart));
        return domainCarts;
    },
    toDomainCart(prismaCart) {
        if (!prismaCart) {
            return null;
        }
        const cart = new cart_1.Cart({
            id: prismaCart.id,
            totalQuantity: prismaCart.totalQuantity,
            totalAmount: prismaCart.totalAmount,
            cartProducts: prismaCart.cartProducts,
        });
        return cart;
    },
});
exports.cartRepoBase = cartRepoBase;
exports.cartRepo = (0, exports.cartRepoBase)(connection_1.default);
//# sourceMappingURL=cart.repsitory.js.map