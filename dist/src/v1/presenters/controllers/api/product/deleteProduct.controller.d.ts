import { DeleteProductUseCaseType } from "../../../../usecases/api/product/deleteProduct.usecase";
import { NextFunction, Request, Response } from "express";
export declare const deleteProductControllerBase: (deleteProductUseCase: DeleteProductUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteProductController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
