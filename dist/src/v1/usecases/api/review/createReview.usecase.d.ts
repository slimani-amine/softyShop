import { IReviewRepository, reviewRepo } from "../../../data/repositories/review.repository";
import { ICreateReviewInput, IReview } from "../../../domain/reviews/reviews";
export type CreateReviewUseCaseType = (payload: ICreateReviewInput) => Promise<{
    review: IReview;
}>;
export declare const createReviewUseCaseBase: (dependencies?: {
    reviewRepo: IReviewRepository;
}) => CreateReviewUseCaseType;
export declare function validateCreateReviewPayload(payload: ICreateReviewInput): ICreateReviewInput;
export declare const createReviewUseCase: CreateReviewUseCaseType;
