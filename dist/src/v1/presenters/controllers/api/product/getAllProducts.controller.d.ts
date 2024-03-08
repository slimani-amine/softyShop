import { GetAllProductUseCaseType } from "../../../../usecases/api/product/getAllProducts.usecase";
import { NextFunction, Request, Response } from "express";
export declare const getAllProductsControllerBase: (getAllProductUseCase: GetAllProductUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllProductsController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
