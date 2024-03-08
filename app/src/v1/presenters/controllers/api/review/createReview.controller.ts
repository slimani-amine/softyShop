import {
  CreateReviewUseCaseType,
  createReviewUseCase,
} from "../../../../usecases/api/review/createReview.usecase";
import { Request, Response, NextFunction } from "express";

export const createReviewControllerBase =
  (createReviewUseCase: CreateReviewUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    req.body.userId = req.user.id;
    try {
      const result = await createReviewUseCase(req.body);

      res.status(201).send({
        message: "Review created successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const createReviewController =
  createReviewControllerBase(createReviewUseCase);
