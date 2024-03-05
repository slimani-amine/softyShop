import {
  GetAllProductUseCaseType,
  getAllProductUseCase,
} from "../../../../usecases/api/product/getAllProducts.usecase";

import { NextFunction, Request, Response } from "express";

export const getAllProductsControllerBase =
  (getAllProductUseCase: GetAllProductUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getAllProductUseCase(req?.query);
      res.status(200).send({
        message: "Success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const getAllProductsController =
  getAllProductsControllerBase(getAllProductUseCase);
