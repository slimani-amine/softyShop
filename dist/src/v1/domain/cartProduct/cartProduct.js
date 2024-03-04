"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartProduct = void 0;
const idAsNumber_1 = require("../types/idAsNumber");
class CartProduct extends idAsNumber_1.NumberId {
    constructor(payload) {
        super(payload.id);
        this.quantity = payload.quantity;
        this.product = payload.product;
        this.cart = payload.cart;
        this.deletedAt = payload.deletedAt;
        this.createdAt = payload.createdAt;
        this.updatedAt = payload.updatedAt;
    }
}
exports.CartProduct = CartProduct;
//# sourceMappingURL=cartProduct.js.map