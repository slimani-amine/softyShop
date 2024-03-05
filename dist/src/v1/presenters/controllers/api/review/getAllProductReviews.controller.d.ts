import { Request, Response, NextFunction } from "express";
import { GetAllProductReviewsUseCaseType } from "../../../../usecases/api/review/getAllProductReviews.usecase";
export declare const getAllProductReviewsControllerBase: (getAllProductReviewsUseCase: GetAllProductReviewsUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllProductReviewsController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
