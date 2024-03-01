import { createBrandUseCaseType } from "../../../../usecases/api/brands/createBrand.usecase";
import { NextFunction, Request, Response } from "express";
declare const createBrandControllerBase: (createBrandUseCase: createBrandUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
declare const createBrandController: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
export { createBrandControllerBase, createBrandController };
