import { IReviewRepository, reviewRepo } from "../../../data/repositories/review.repository";
import { IReview } from "../../../domain/reviews/reviews";
export type GetAllProductReviewsUseCaseType = (productId: string) => Promise<IReview[]>;
export declare const getAllProductReviewsUseCaseBase: (dependencies: {
    reviewRepo: IReviewRepository;
}) => (productId: string) => Promise<IReview[]>;
export declare const getAllProductReviewsUseCase: GetAllProductReviewsUseCaseType;
