import {
  IReviewRepository,
  reviewRepo,
} from "../../../data/repositories/review.repository";

import { exceptionService } from "../../../core/errors/exceptions";
import { trimAndValidateSchemaPayload } from "../../../utils/validation/validate.schema";
import { ICreateReviewInput, IReview } from "../../../domain/reviews/reviews";
import createReviewSchema from "../../../presenters/schemas/product/createProduct.schema";

export type CreateReviewUseCaseType = (
  payload: ICreateReviewInput
) => Promise<{ review: IReview }>;

export const createReviewUseCaseBase =
  (
    dependencies: {
      reviewRepo: IReviewRepository;
    } = {
      reviewRepo: reviewRepo,
    }
  ): CreateReviewUseCaseType =>
  async (payload: ICreateReviewInput) => {
    const existingReviews = await dependencies.reviewRepo.findAll({
      where: [{ review: payload.review }],
    });

    if (existingReviews.length > 0) {
      exceptionService.badRequestException({
        message: "A review with the same content already exists",
      });
    }

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

export function validateCreateReviewPayload(
  payload: ICreateReviewInput
): ICreateReviewInput {
  trimAndValidateSchemaPayload<ICreateReviewInput>(createReviewSchema, payload);
  return payload;
}

export const createReviewUseCase: CreateReviewUseCaseType =
  createReviewUseCaseBase({
    reviewRepo,
  });
