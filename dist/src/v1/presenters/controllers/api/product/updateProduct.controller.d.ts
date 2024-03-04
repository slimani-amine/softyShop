import { Request, Response, NextFunction } from "express";
import { UpdateProductUseCaseType } from "../../../../usecases/api/product/updateProduct.usecase";
export declare const updateProductControllerBase: (updateProductUseCase: UpdateProductUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateProductController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
