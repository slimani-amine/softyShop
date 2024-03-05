import {
  IReviewRepository,
  reviewRepo,
} from "../../../data/repositories/review.repository";
import { IReview } from "../../../domain/reviews/reviews";

export type UpdateReviewUseCaseType = (
  review: IReview,
  updatePayload: Partial<IReview>
) => Promise<IReview>;

export const updateReviewUseCaseBase =
  (reviewRepository: IReviewRepository) =>
  async (review: IReview, updatePayload: Partial<IReview>) => {
    const updatedReview = await reviewRepository.updateReview(
      review,
      updatePayload
    );
    return updatedReview;
  };

export const updateReviewUseCase: UpdateReviewUseCaseType =
  updateReviewUseCaseBase(reviewRepo);
