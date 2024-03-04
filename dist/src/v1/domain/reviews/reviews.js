"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const idAsNumber_1 = require("../types/idAsNumber");
class Review extends idAsNumber_1.NumberId {
    constructor(payload) {
        super(payload.id);
        this.review = payload.review;
        this.rating = payload.rating;
        this.user = payload.user;
        this.product = payload.product;
        this.deletedAt = payload.deletedAt;
        this.createdAt = payload.createdAt;
        this.updatedAt = payload.updatedAt;
    }
}
exports.Review = Review;
//# sourceMappingURL=reviews.js.map