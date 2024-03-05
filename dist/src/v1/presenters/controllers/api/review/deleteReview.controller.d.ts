import { DeleteReviewUseCaseType } from "../../../../usecases/api/review/deleteReview.usecase";
import { NextFunction, Request, Response } from "express";
export declare const deleteReviewControllerBase: (deleteReviewUseCase: DeleteReviewUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteReviewController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
