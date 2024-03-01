import { productCreatorRepo } from "../../../../data/repositories/productCreator.repository";
import {
  UpdateProductCreatorUseCaseType,
  updateProductCreatorUseCase,
} from "../../../../usecases/api/productCreator/updateProductCreator.usecase";
import { Request, Response, NextFunction } from "express";

export const updateProductCreatorControllerBase =
  (updateProductCreatorUseCase: UpdateProductCreatorUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productCreatorId = req.params.productCreatorId;
      const productCreator = await productCreatorRepo.findOne({ where: { id: productCreatorId } });

      if (!productCreator) {
        return res.status(404).json({
          message: "Product Creator not found",
        });
      }

      const updatePayload = req.body;

      const result = await updateProductCreatorUseCase(productCreator, updatePayload);

      if (!result) {
        return res.status(404).json({
          message: "Product Creator not found",
        });
      }

      res.status(201).send({
        message: "Product Creator updated successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const updateProductCreatorController =
  updateProductCreatorControllerBase(updateProductCreatorUseCase);
