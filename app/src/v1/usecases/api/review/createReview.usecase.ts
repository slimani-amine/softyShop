import {
  IReviewRepository,
  reviewRepo,
} from "../../../data/repositories/review.repository";

import { trimAndValidateSchemaPayload } from "../../../utils/validation/validate.schema";
import { ICreateReviewInput, IReview } from "../../../domain/reviews/reviews";
import createReviewSchema from "../../../presenters/schemas/review/createProduct.schema";

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
