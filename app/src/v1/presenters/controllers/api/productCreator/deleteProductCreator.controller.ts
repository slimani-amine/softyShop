import {
  deleteProductCreatorUseCase,
  DeleteProductCreatorUseCaseType,
} from "../../../../usecases/api/productCreator/deleteProductCreator.usecase";
import { NextFunction, Request, Response } from "express";

export const deleteProductCreatorControllerBase =
  (deleteProductCreatorUseCase: DeleteProductCreatorUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await deleteProductCreatorUseCase(req?.params);
      res.status(200).send({
        message: "Success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const deleteProductCreatorController =
  deleteProductCreatorControllerBase(deleteProductCreatorUseCase);
