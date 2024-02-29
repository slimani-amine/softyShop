import {
  CreateCategoryUseCaseType,
  createCategoryUseCase,
} from "../../../../usecases/api/category/createCategory.usecase";
import { Request, Response, NextFunction } from "express";

export const createCategoryControllerBase =
  (createCategoryUseCase: CreateCategoryUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await createCategoryUseCase(req.body);

      res.status(201).send({
        message: "Category created successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const createCategoryController = createCategoryControllerBase(
  createCategoryUseCase
);
