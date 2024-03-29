"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const idAsNumber_1 = require("../types/idAsNumber");
class Store extends idAsNumber_1.NumberId {
    constructor(payload) {
        super(payload.id);
        this.name = payload.name;
        this.logo = payload.logo;
        this.isPublished = payload.isPublished;
        this.location = payload.location;
        this.address = payload.address;
        this.socialMediaLinks = payload.socialMediaLinks;
        this.user = payload.user;
        this.products = payload.products;
    }
}
exports.Store = Store;
//# sourceMappingURL=store.js.map