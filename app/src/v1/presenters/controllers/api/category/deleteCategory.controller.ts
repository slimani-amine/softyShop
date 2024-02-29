import {
  DeleteCategoryUseCaseType,
  deleteCategoryUseCase,
} from "../../../../usecases/api/category/deleteCategory.usecase";

import { NextFunction, Request, Response } from "express";

export const deleteCategoryControllerBase =
  (deleteCategoryUseCase: DeleteCategoryUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {

    try {
      const result = await deleteCategoryUseCase(req?.params);
      res.status(200).send({
        message: "success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const deleteCategoryController = deleteCategoryControllerBase(
  deleteCategoryUseCase
);
