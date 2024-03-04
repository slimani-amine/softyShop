import { UpdateProductCreatorUseCaseType } from "../../../../usecases/api/productCreator/updateProductCreator.usecase";
import { Request, Response, NextFunction } from "express";
export declare const updateProductCreatorControllerBase: (updateProductCreatorUseCase: UpdateProductCreatorUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
export declare const updateProductCreatorController: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
