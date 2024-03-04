"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const idAsNumber_1 = require("../types/idAsNumber");
class Product extends idAsNumber_1.NumberId {
    constructor(payload) {
        super(payload.id);
        this.name = payload.name;
        this.price = payload.price;
        this.stockNumber = payload.stockNumber;
        this.publishedAt = payload.publishedAt;
        this.availability = payload.availability;
        this.isPublished = payload.isPublished;
        this.isAccepted = payload.isAccepted;
        this.creator = payload.creator;
        this.brand = payload.brand;
        this.reviews = payload.reviews || [];
        this.wishlist = payload.wishlist || [];
        this.cartProducts = payload.cartProducts || [];
        this.store = payload.store;
        this.category = payload.category;
    }
}
exports.Product = Product;
//# sourceMappingURL=product.js.map