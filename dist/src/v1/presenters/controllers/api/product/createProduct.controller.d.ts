import { createProductUseCaseType } from "../../../../usecases/api/product/createProduct.usecase";
import { NextFunction, Request, Response } from "express";
declare const createProductControllerBase: (createProductUseCase: createProductUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
declare const createProductController: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
export { createProductControllerBase, createProductController };
