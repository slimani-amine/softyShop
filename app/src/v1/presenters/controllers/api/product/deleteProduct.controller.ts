import {
  DeleteProductUseCaseType,
  deleteProductUseCase,
} from "../../../../usecases/api/product/deleteProduct.usecase";
import { NextFunction, Request, Response } from "express";

export const deleteProductControllerBase =
  (deleteProductUseCase: DeleteProductUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await deleteProductUseCase(req?.params);
      res.status(200).send({
        message: "success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const deleteProductController =
  deleteProductControllerBase(deleteProductUseCase);
