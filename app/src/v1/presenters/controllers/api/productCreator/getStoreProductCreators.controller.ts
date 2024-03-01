import {
  getStoreProductCreatorUseCase,
  GetStoreProductCreatorUseCaseType,
} from "../../../../usecases/api/productCreator/getStoreProductCreators.usecase";
import { NextFunction, Request, Response } from "express";

export const getStoreProductCreatorControllerBase =
  (getStoreProductCreatorUseCase: GetStoreProductCreatorUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const storeId = req.params.id;
    try {
      const result = await getStoreProductCreatorUseCase({storeId});
      res.status(200).send({
        message: "Success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const getStoreProductCreatorController =
  getStoreProductCreatorControllerBase(getStoreProductCreatorUseCase);
