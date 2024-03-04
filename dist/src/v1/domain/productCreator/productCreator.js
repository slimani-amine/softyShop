"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCreator = void 0;
const idAsNumber_1 = require("../types/idAsNumber");
class ProductCreator extends idAsNumber_1.NumberId {
    constructor(payload) {
        super(payload.id);
        this.name = payload.name;
        this.store = payload.store;
    }
}
exports.ProductCreator = ProductCreator;
//# sourceMappingURL=productCreator.js.map