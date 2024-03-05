"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReviewController = exports.updateReviewControllerBase = void 0;
const updateReview_usecase_1 = require("../../../../usecases/api/review/updateReview.usecase");
const exceptions_1 = require("../../../../core/errors/exceptions");
const review_repository_1 = require("../../../../data/repositories/review.repository");
const updateReviewControllerBase = (updateReviewUseCase) => async (req, res, next) => {
    try {
        const reviewId = req.params.id;
        const review = await review_repository_1.reviewRepo.findOne({
            where: { id: reviewId },
        });
        if (!review) {
            exceptions_1.exceptionService.notFoundException({
                message: "Review not found with id " + reviewId,
            });
        }
        const updatePayload = req.body;
        const result = await updateReviewUseCase(review, updatePayload);
        res.status(201).send({
            message: "Review updated successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateReviewControllerBase = updateReviewControllerBase;
exports.updateReviewController = (0, exports.updateReviewControllerBase)(updateReview_usecase_1.updateReviewUseCase);
//# sourceMappingURL=updateReview.controller.js.map