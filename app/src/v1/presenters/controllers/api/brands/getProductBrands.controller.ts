import {
  GetProductBrandsUseCaseType,
  getProductBrandsUseCase,
} from "../../../../usecases/api/brands/getProductBrands.usecase";
import { NextFunction, Request, Response } from "express";

export const getProductBrandsControllerBase =
  (getProductBrandsUseCase: GetProductBrandsUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { storeId, productId } = req.params;

    try {
      const result = await getProductBrandsUseCase({ storeId, productId });
      res.status(200).send({
        message: "Success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const getProductBrandsController = getProductBrandsControllerBase(
  getProductBrandsUseCase
);