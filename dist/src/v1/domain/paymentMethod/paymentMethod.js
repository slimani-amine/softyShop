"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethod = void 0;
const idAsNumber_1 = require("../types/idAsNumber");
class PaymentMethod extends idAsNumber_1.NumberId {
    constructor(payload) {
        super(payload.id);
        this.name = payload.name;
        this.icon = payload.icon;
    }
}
exports.PaymentMethod = PaymentMethod;
//# sourceMappingURL=paymentMethod.js.map