"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReviewUseCase = exports.updateReviewUseCaseBase = void 0;
const review_repository_1 = require("../../../data/repositories/review.repository");
const updateReviewUseCaseBase = (reviewRepository) => async (review, updatePayload) => {
    const updatedReview = await reviewRepository.updateReview(review, updatePayload);
    return updatedReview;
};
exports.updateReviewUseCaseBase = updateReviewUseCaseBase;
exports.updateReviewUseCase = (0, exports.updateReviewUseCaseBase)(review_repository_1.reviewRepo);
//# sourceMappingURL=updateReview.usecase.js.map