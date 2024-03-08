"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wishlist = void 0;
const idAsNumber_1 = require("../types/idAsNumber");
class Wishlist extends idAsNumber_1.NumberId {
    constructor(payload) {
        super(payload.id);
        this.user = payload.user;
        this.product = payload.product;
    }
}
exports.Wishlist = Wishlist;
//# sourceMappingURL=wishlist.js.map