import { createBrandUseCase } from "../../../../usecases/api/brands/createBrand.usecase";
import {
  createProductUseCase,
  createProductUseCaseType,
} from "../../../../usecases/api/product/createProduct.usecase";
import { NextFunction, Request, Response } from "express";
import { getStoreProductCreatorUseCase } from "../../../../usecases/api/productCreator/getStoreProductCreators.usecase";
import { getVendorStoresUseCase } from "../../../../usecases/api/store/getVendorStores.usecase";
import { exceptionService } from "../../../../core/errors/exceptions";

const createProductControllerBase =
  (createProductUseCase: createProductUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {


      const userId = req.user.id;
      const myStores = await getVendorStoresUseCase({ userId });
      if (!myStores.length) {
        exceptionService.unauthorizedException({
          message: "Invalid vendor store add a store first",
        });
      }

      req.body.storeId = req.params.id;

      const result = await createProductUseCase(req?.body);
      console.log("🚀 ~ result:", result);
      return res.status(201).json({
        message: "Product added successfully",
        data: {
          product: result.product,
        },
      });
    } catch (error) {
      next(error);
    }
  };

const createProductController =
  createProductControllerBase(createProductUseCase);
export { createProductControllerBase, createProductController };
