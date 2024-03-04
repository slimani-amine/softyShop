import { GetStoreBrandsUseCaseType } from "../../../../usecases/api/brands/getStoreBrands.usecase";
import { NextFunction, Request, Response } from "express";
export declare const getStoreBrandsControllerBase: (getStoreBrandsUseCase: GetStoreBrandsUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getStoreBrandsController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
