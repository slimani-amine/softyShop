import { GetProductBrandsUseCaseType } from "../../../../usecases/api/brands/getProductBrands.usecase";
import { NextFunction, Request, Response } from "express";
export declare const getProductBrandsControllerBase: (getProductBrandsUseCase: GetProductBrandsUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getProductBrandsController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
