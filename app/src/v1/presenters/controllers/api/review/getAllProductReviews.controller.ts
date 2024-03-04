import { Request, Response, NextFunction } from "express";
import {
  getAllProductReviewsUseCase,
  GetAllProductReviewsUseCaseType,
} from "../../../../usecases/api/review/getAllProductReviews.usecase";

export const getAllProductReviewsControllerBase =
  (getAllProductReviewsUseCase: GetAllProductReviewsUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = req.params.id;
      const result = await getAllProductReviewsUseCase(productId);

      res.status(200).send({
        message: "success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const getAllProductReviewsController =
  getAllProductReviewsControllerBase(getAllProductReviewsUseCase);
