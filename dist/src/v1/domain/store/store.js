"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const idAsNumber_1 = require("../types/idAsNumber");
class Store extends idAsNumber_1.NumberId {
    constructor(payload) {
        super(payload.id);
        this.storeName = payload.storeName;
        this.logo = payload.logo;
        this.isPublished = payload.isPublished;
        this.position = payload.position;
        this.socialMediaLinks = payload.socialMediaLinks;
        this.user = payload.user;
        this.products = payload.products;
    }
}
exports.Store = Store;
//# sourceMappingURL=store.js.map