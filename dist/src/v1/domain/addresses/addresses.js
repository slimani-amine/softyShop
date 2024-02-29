"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const idAsNumber_1 = require("../types/idAsNumber");
class Address extends idAsNumber_1.NumberId {
    constructor(payload) {
        super(payload.id);
        this.address = payload.address;
        this.city = payload.city;
        this.state = payload.state;
        this.zipCode = payload.zipCode;
        this.user = payload.user;
    }
}
exports.Address = Address;
//# sourceMappingURL=addresses.js.map