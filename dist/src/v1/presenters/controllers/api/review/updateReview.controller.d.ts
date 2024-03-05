import { Request, Response, NextFunction } from "express";
import { UpdateReviewUseCaseType } from "../../../../usecases/api/review/updateReview.usecase";
export declare const updateReviewControllerBase: (updateReviewUseCase: UpdateReviewUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateReviewController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
