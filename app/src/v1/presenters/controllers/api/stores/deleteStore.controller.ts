import {
  DeleteStoreUseCaseType,
  deleteStoreUseCase,
} from "../../../../usecases/api/store/deleteStores.usecase";

import { NextFunction, Request, Response } from "express";

export const deleteStoresControllerBase =
  (deleteStoreUseCase: DeleteStoreUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await deleteStoreUseCase(req?.params);
      res.status(200).send({
        message: "Store delete successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const deleteStoresController =
  deleteStoresControllerBase(deleteStoreUseCase);
