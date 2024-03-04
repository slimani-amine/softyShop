import { createProductCreatorUseCaseType } from "../../../../usecases/api/productCreator/createProductCreator.usecase";
import { NextFunction, Request, Response } from "express";
export declare const createProductCreatorControllerBase: (createProductCreatorUseCase: createProductCreatorUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
export declare const createProductCreatorController: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
