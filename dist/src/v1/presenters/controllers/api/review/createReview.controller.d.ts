import { CreateReviewUseCaseType } from "../../../../usecases/api/review/createReview.usecase";
import { Request, Response, NextFunction } from "express";
export declare const createReviewControllerBase: (createReviewUseCase: CreateReviewUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createReviewController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
