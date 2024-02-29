import { Request, Response, NextFunction } from "express";

import { categoryRepo } from "../../../../data/repositories/category.repository";
import {
  UpdateCategoryUseCaseType,
  updateCategoryUseCase,
} from "../../../../usecases/api/category/updateCategory.usecase";
import { exceptionService } from "../../../../core/errors/exceptions";

export const updatecategoryControllerBase =
  (updatecategoryUseCase: UpdateCategoryUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryId = req.params.categoryId;
      const category = await categoryRepo.findOne({
        where: { id: categoryId },
      });
      if (!category) {
        exceptionService.notFoundException({
          message: "No payment method found with id " + categoryId,
        });
      }

      const updatePayload = req.body;

      const result = await updatecategoryUseCase(category, updatePayload);

      res.status(201).send({
        message: "category updated successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const updatecategoryController = updatecategoryControllerBase(
  updateCategoryUseCase
);
