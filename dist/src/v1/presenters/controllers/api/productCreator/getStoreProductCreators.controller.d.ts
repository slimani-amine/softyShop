import { GetStoreProductCreatorUseCaseType } from "../../../../usecases/api/productCreator/getStoreProductCreators.usecase";
import { NextFunction, Request, Response } from "express";
export declare const getStoreProductCreatorControllerBase: (getStoreProductCreatorUseCase: GetStoreProductCreatorUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getStoreProductCreatorController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
