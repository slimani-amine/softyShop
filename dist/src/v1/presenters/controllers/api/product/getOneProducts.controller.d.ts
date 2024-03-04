import { GetOneProductUseCaseType } from "../../../../usecases/api/product/getOneProduct.usecase";
import { NextFunction, Request, Response } from "express";
export declare const getOneProductControllerBase: (getOneProductUseCase: GetOneProductUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getOneProductController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
