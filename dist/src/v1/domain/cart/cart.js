"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const idAsNumber_1 = require("../types/idAsNumber");
class Cart extends idAsNumber_1.NumberId {
    constructor(payload) {
        super(payload.id);
        this.totalQuantity = payload.totalQuantity;
        this.totalAmount = payload.totalAmount;
        this.address = payload.address;
        this.date = payload.date;
        this.estimatedDeliveryDate = payload.estimatedDeliveryDate;
        this.cartProduct = payload.cartProduct;
        this.order = payload.order;
        this.paymentMethod = payload.paymentMethod;
        this.deletedAt = payload.deletedAt;
        this.createdAt = payload.createdAt;
        this.updatedAt = payload.updatedAt;
    }
}
exports.Cart = Cart;
//# sourceMappingURL=cart.js.map