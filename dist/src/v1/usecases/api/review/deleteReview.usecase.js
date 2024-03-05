"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviewUseCase = exports.deleteReviewUseCaseBase = void 0;
const exceptions_1 = require("../../../core/errors/exceptions");
const review_repository_1 = require("../../../data/repositories/review.repository");
const deleteReviewUseCaseBase = (dependencies = {
    reviewRepo: review_repository_1.reviewRepo,
}) => async (params) => {
    const review = await dependencies.reviewRepo.findOne({
        where: { id: params.id },
    });
    if (!review) {
        exceptions_1.exceptionService.notFoundException({
            message: "Review not found",
        });
    }
    const result = await dependencies.reviewRepo.deleteReview(review);
    return {
        success: result === 1,
    };
};
exports.deleteReviewUseCaseBase = deleteReviewUseCaseBase;
exports.deleteReviewUseCase = (0, exports.deleteReviewUseCaseBase)({
    reviewRepo: review_repository_1.reviewRepo,
});
//# sourceMappingURL=deleteReview.usecase.js.map