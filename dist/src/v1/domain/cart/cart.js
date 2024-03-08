"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const idAsNumber_1 = require("../types/idAsNumber");
class Cart extends idAsNumber_1.NumberId {
    constructor(payload) {
        super(payload.id);
        this.totalQuantity = payload.totalQuantity;
        this.totalAmount = payload.totalAmount;
        this.cartProducts = payload.cartProducts;
    }
}
exports.Cart = Cart;
//# sourceMappingURL=cart.js.map