import { IReviewRepository } from "../../../data/repositories/review.repository";
import { IReview } from "../../../domain/reviews/reviews";
export type UpdateReviewUseCaseType = (review: IReview, updatePayload: Partial<IReview>) => Promise<IReview>;
export declare const updateReviewUseCaseBase: (reviewRepository: IReviewRepository) => (review: IReview, updatePayload: Partial<IReview>) => Promise<IReview>;
export declare const updateReviewUseCase: UpdateReviewUseCaseType;
