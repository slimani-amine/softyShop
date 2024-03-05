import { IReviewRepository, reviewRepo } from "../../../data/repositories/review.repository";
export type DeleteReviewUseCaseType = (params: {
    [id: string]: any;
}) => Promise<{
    success: boolean;
}>;
export declare const deleteReviewUseCaseBase: (dependencies?: {
    reviewRepo: IReviewRepository;
}) => DeleteReviewUseCaseType;
export declare const deleteReviewUseCase: DeleteReviewUseCaseType;
