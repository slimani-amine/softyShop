import { exceptionService } from "../../../core/errors/exceptions";
import {
  IReviewRepository,
  reviewRepo,
} from "../../../data/repositories/review.repository";

export type DeleteReviewUseCaseType = (params: {
  [id: string]: any;
}) => Promise<{ success: boolean }>;

export const deleteReviewUseCaseBase =
  (
    dependencies: {
      reviewRepo: IReviewRepository;
    } = {
      reviewRepo: reviewRepo,
    }
  ): DeleteReviewUseCaseType =>
  async (params: { [id: string]: any }) => {
    const review = await dependencies.reviewRepo.findOne({
      where: { id: params.id },
    });

    if (!review) {
      exceptionService.notFoundException({
        message: "Review not found",
      });
    }

    const result = await dependencies.reviewRepo.deleteReview(review);

    return {
      success: result === 1,
    };
  };

export const deleteReviewUseCase: DeleteReviewUseCaseType =
  deleteReviewUseCaseBase({
    reviewRepo,
  });