import { GetStoreProductUseCaseType } from "../../../../usecases/api/product/getStoreProducts.usecase";
import { NextFunction, Request, Response } from "express";
export declare const getStoreProductsControllerBase: (getStoreProductUseCase: GetStoreProductUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getStoreProductsController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
