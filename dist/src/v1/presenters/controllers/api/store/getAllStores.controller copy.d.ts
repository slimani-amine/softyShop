import { GetAllStoreUseCaseType } from '../../../../usecases/api/store/getAllStores.usecase';
import { NextFunction, Request, Response } from 'express';
export declare const getAllStoresControllerBase: (getAllStoreUseCase: GetAllStoreUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllStoresController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
