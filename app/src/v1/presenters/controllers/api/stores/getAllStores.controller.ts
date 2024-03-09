import {
  GetAllStoreUseCaseType,
  getAllStoreUseCase,
} from '../../../../usecases/api/store/getAllStores.usecase';

import { NextFunction, Request, Response } from 'express';

export const getAllStoresControllerBase =
  (getAllStoreUseCase: GetAllStoreUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getAllStoreUseCase(req?.query);
      res.status(200).send({
        message: 'success',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const getAllStoresController = getAllStoresControllerBase(getAllStoreUseCase);
