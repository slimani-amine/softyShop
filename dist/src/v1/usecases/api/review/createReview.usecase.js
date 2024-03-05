"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReviewUseCase = exports.validateCreateReviewPayload = exports.createReviewUseCaseBase = void 0;
const review_repository_1 = require("../../../data/repositories/review.repository");
const validate_schema_1 = require("../../../utils/validation/validate.schema");
const createProduct_schema_1 = require("../../../presenters/schemas/product/createProduct.schema");
const createReviewUseCaseBase = (dependencies = {
    reviewRepo: review_repository_1.reviewRepo,
}) => async (payload) => {
    validateCreateReviewPayload(payload);
    const reviewCreated = await dependencies.reviewRepo.createReview({
        review: payload.review,
        rating: payload.rating,
        userId: payload.userId,
        productId: payload.productId,
    });
    return {
        review: reviewCreated,
    };
};
exports.createReviewUseCaseBase = createReviewUseCaseBase;
function validateCreateReviewPayload(payload) {
    (0, validate_schema_1.trimAndValidateSchemaPayload)(createProduct_schema_1.default, payload);
    return payload;
}
exports.validateCreateReviewPayload = validateCreateReviewPayload;
exports.createReviewUseCase = (0, exports.createReviewUseCaseBase)({
    reviewRepo: review_repository_1.reviewRepo,
});
//# sourceMappingURL=createReview.usecase.js.map