import { DeleteProductCreatorUseCaseType } from "../../../../usecases/api/productCreator/deleteProductCreator.usecase";
import { NextFunction, Request, Response } from "express";
export declare const deleteProductCreatorControllerBase: (deleteProductCreatorUseCase: DeleteProductCreatorUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteProductCreatorController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
