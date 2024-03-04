import {
  getOneProductUseCase,
  GetOneProductUseCaseType,
} from "../../../../usecases/api/product/getOneProduct.usecase";
import { NextFunction, Request, Response } from "express";

export const getOneProductControllerBase =
  (getOneProductUseCase: GetOneProductUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getOneProductUseCase(req?.params);
      res.status(200).send({
        message: "Success",
        data: result,
      });
    } catch (err) {
      res.status(404).send({
        message: "Product not found",
        data: null,
      });
    }
  };

export const getOneProductController =
  getOneProductControllerBase(getOneProductUseCase);
