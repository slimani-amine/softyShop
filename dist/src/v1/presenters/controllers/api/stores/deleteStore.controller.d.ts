import { DeleteStoreUseCaseType } from "../../../../usecases/api/store/deleteStores.usecase";
import { NextFunction, Request, Response } from "express";
export declare const deleteStoresControllerBase: (deleteStoreUseCase: DeleteStoreUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteStoresController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
