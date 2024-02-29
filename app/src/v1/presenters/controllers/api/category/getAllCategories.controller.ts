import {
  getAllCategoriesUseCase,
  getAllCategoriesUseCaseType,
} from "../../../../usecases/api/category/getAllCategories.usecase";
import { NextFunction, Request, Response } from "express";

export const getAllCategoriesControllerBase =
  (getAllCategoriesUseCase: getAllCategoriesUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getAllCategoriesUseCase(req?.query);
      res.status(200).send({
        message: "success",
        data: result.docs,
      });
    } catch (err) {
      next(err);
    }
  };

export const getAllCategoryController = getAllCategoriesControllerBase(
  getAllCategoriesUseCase
);
