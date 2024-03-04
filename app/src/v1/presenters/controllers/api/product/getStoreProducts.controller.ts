import {
  GetStoreProductUseCaseType,
  getStoreProductUseCase,
} from "../../../../usecases/api/product/getStoreProducts.usecase";

import { NextFunction, Request, Response } from "express";
import { getVendorStoresUseCase } from "../../../../usecases/api/store/getVendorStores.usecase";
export const getStoreProductsControllerBase =
  (getStoreProductUseCase: GetStoreProductUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const storeId = req.params.id;
    const userId = req.user.id;

    try {

      const result = await getStoreProductUseCase({ storeId });
      res.status(200).send({
        message: "success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const getStoreProductsController = getStoreProductsControllerBase(
  getStoreProductUseCase
);
