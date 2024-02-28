import { createStoreUseCaseType } from '../../../../usecases/api/store/createStore.usecase';
import { NextFunction, Request, Response } from 'express';
declare const createStoreControllerBase: (createStoreUseCase: createStoreUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
declare const createStoreController: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
export { createStoreControllerBase, createStoreController };
