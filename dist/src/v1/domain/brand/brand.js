"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brand = void 0;
const idAsNumber_1 = require("../types/idAsNumber");
class Brand extends idAsNumber_1.NumberId {
    constructor(payload) {
        super(payload.id);
        this.name = payload.name;
        this.logo = payload.logo;
        this.store = payload.store;
    }
}
exports.Brand = Brand;
//# sourceMappingURL=brand.js.map