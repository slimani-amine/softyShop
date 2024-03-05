"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProductReviewsUseCase = exports.getAllProductReviewsUseCaseBase = void 0;
const product_repository_1 = require("../../../data/repositories/product.repository");
const review_repository_1 = require("../../../data/repositories/review.repository");
const getAllProductReviewsUseCaseBase = (dependencies) => async (productId) => {
    const product = (await product_repository_1.productRepo.findOne({
        where: { id: productId },
    }));
    console.log("🚀 ~ product:", product);
    const reviews = await dependencies.reviewRepo.findAll({
        where: { product: product },
    });
    console.log("🚀 ~ reviews:", reviews);
    return reviews;
};
exports.getAllProductReviewsUseCaseBase = getAllProductReviewsUseCaseBase;
exports.getAllProductReviewsUseCase = (0, exports.getAllProductReviewsUseCaseBase)({
    reviewRepo: review_repository_1.reviewRepo,
});
//# sourceMappingURL=getAllProductReviews.usecase.js.map