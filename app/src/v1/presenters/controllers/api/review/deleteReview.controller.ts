import {
  DeleteReviewUseCaseType,
  deleteReviewUseCase,
} from "../../../../usecases/api/review/deleteReview.usecase";

import { NextFunction, Request, Response } from "express";

export const deleteReviewControllerBase =
  (deleteReviewUseCase: DeleteReviewUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await deleteReviewUseCase(req?.params);
      res.status(200).send({
        message: "success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const deleteReviewController = deleteReviewControllerBase(
  deleteReviewUseCase
);