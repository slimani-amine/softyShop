import { GetOneStoreUseCaseType } from '../../../../usecases/api/store/getOneStore.usecase';
import { NextFunction, Request, Response } from 'express';
export declare const getOneStoreControllerBase: (getOneStoreUseCase: GetOneStoreUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getOneStoreController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
