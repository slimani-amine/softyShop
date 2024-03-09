import {
  createStoreUseCase,
  createStoreUseCaseType,
} from '../../../../usecases/api/store/createStore.usecase';
import { NextFunction, Request, Response } from 'express';

const createStoreControllerBase =
  (createStoreUseCase: createStoreUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await createStoreUseCase(req?.body);
      return res.status(201).json({
        message: 'Store Add successfully',
        data: {
          store: result.store,
        },
      });
    } catch (error) {
      next(error);
    }
  };

const createStoreController = createStoreControllerBase(createStoreUseCase);
export { createStoreControllerBase, createStoreController };
