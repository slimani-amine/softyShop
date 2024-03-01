import {
  GetStoreBrandsUseCaseType,
  getStoreBrandsUseCase,
} from "../../../../usecases/api/brands/getStoreBrands.usecase";
import { NextFunction, Request, Response } from "express";

export const getStoreBrandsControllerBase =
  (getStoreBrandsUseCase: GetStoreBrandsUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const storeId = req.params.id;

    try {
      const result = await getStoreBrandsUseCase({ storeId });
      res.status(200).send({
        message: "Success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const getStoreBrandsController = getStoreBrandsControllerBase(
  getStoreBrandsUseCase
);
