"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const idAsNumber_1 = require("../types/idAsNumber");
class Order extends idAsNumber_1.NumberId {
    constructor(payload) {
        super(payload.id);
        this.status = payload.status;
        this.cart = payload.cart;
        this.address = payload.address;
        this.date = payload.date;
        this.estimatedDeliveryDate = payload.estimatedDeliveryDate;
        this.deletedAt = payload.deletedAt;
        this.createdAt = payload.createdAt;
        this.updatedAt = payload.updatedAt;
    }
}
exports.Order = Order;
//# sourceMappingURL=order.js.map