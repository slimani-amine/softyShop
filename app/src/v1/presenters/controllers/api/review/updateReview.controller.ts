import { Request, Response, NextFunction } from "express";
import {
  updateReviewUseCase,
  UpdateReviewUseCaseType,
} from "../../../../usecases/api/review/updateReview.usecase";
import { exceptionService } from "../../../../core/errors/exceptions";
import { reviewRepo } from "../../../../data/repositories/review.repository";

export const updateReviewControllerBase =
  (updateReviewUseCase: UpdateReviewUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reviewId = req.params.id;
      const review = await reviewRepo.findOne({
        where: { id: reviewId },
      });

      if (!review) {
        exceptionService.notFoundException({
          message: "Review not found with id " + reviewId,
        });
      }

      const updatePayload = req.body;

      const result = await updateReviewUseCase(review, updatePayload);

      res.status(201).send({
        message: "Review updated successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const updateReviewController =
  updateReviewControllerBase(updateReviewUseCase);
