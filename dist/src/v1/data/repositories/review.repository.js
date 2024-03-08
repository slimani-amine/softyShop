"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRepo = exports.reviewRepoBase = void 0;
const reviews_entity_1 = require("../orm_models/reviews.entity");
const reviews_1 = require("../../domain/reviews/reviews");
const connection_1 = require("../connection");
const apiFeatures_util_1 = require("../../utils/querying/apiFeatures.util");
const user_entity_1 = require("../orm_models/user.entity");
const product_entity_1 = require("../orm_models/product.entity");
const exceptions_1 = require("../../core/errors/exceptions");
const reviewRepoBase = (dbConnection) => ({
    manager: dbConnection.manager,
    async findOne(findData) {
        const review = await this.manager.findOne(reviews_entity_1.ReviewsEntity, findData);
        return this.toDomainReview(review);
    },
    async findAll(findData) {
        const reviews = await this.manager.find(reviews_entity_1.ReviewsEntity, findData);
        return this.toDomainReviews(reviews);
    },
    async createReview(payload) {
        const user = await this.manager.findOne(user_entity_1.UserEntity, {
            where: { id: parseInt(payload.userId, 10) },
        });
        if (!user) {
            exceptions_1.exceptionService.notFoundException({
                message: "User not found",
            });
        }
        const product = await this.manager.findOne(product_entity_1.ProductEntity, {
            where: { id: payload.productId },
        });
        if (!product) {
            exceptions_1.exceptionService.notFoundException({
                message: "Product not found",
            });
        }
        const review = this.manager.create(reviews_entity_1.ReviewsEntity, {
            review: payload.review,
            rating: payload.rating,
            user: user,
            product: product,
        });
        const result = await this.manager.save(reviews_entity_1.ReviewsEntity, review);
        return this.toDomainReview(result);
    },
    async updateReview(review, payload) {
        await this.manager.update(reviews_entity_1.ReviewsEntity, { id: review.getIdAsNumber() }, payload);
        const updatedReview = await this.manager.findOne(reviews_entity_1.ReviewsEntity, {
            where: { id: review.getIdAsNumber().toString() },
        });
        return this.toDomainReview(updatedReview);
    },
    async deleteReview(review) {
        const result = await this.manager.softDelete(reviews_entity_1.ReviewsEntity, {
            id: review.id,
        });
        return result !== null ? 1 : 0;
    },
    async deleteMany(payload) {
        const result = await this.manager.softDelete(reviews_entity_1.ReviewsEntity, payload);
        return result.affected;
    },
    async findByQuery(queryParams) {
        const result = await apiFeatures_util_1.ApiFeatures.generateSqlQuery(connection_1.default, "reviews", queryParams, {});
        return {
            docs: this.toDomainReviews(result.docs),
            meta: result.meta,
        };
    },
    toDomainReviews(reviews) {
        const domainReviews = reviews.map((prismaReview) => this.toDomainReview(prismaReview));
        return domainReviews;
    },
    toDomainReview(prismaReview) {
        if (!prismaReview) {
            return null;
        }
        const review = new reviews_1.Review({
            id: prismaReview.id,
            review: prismaReview.review,
            rating: prismaReview.rating,
        });
        return review;
    },
});
exports.reviewRepoBase = reviewRepoBase;
exports.reviewRepo = (0, exports.reviewRepoBase)(connection_1.default);
//# sourceMappingURL=review.repository.js.map