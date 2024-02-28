import {
  getOneStoreUseCase,
  GetOneStoreUseCaseType,
} from '../../../../usecases/api/store/getOneStore.usecase';
import { NextFunction, Request, Response } from 'express';

export const getOneStoreControllerBase =
  (getOneStoreUseCase: GetOneStoreUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req?.params);

    try {
      const result = await getOneStoreUseCase(req?.params);
      res.status(200).send({
        message: 'success',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const getOneStoreController = getOneStoreControllerBase(getOneStoreUseCase);
