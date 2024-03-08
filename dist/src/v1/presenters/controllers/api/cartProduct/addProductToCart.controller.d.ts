import { AddProductToCartUseCaseType } from "../../../../usecases/api/cartProduct/addProductToCart.usecase";
import { Request, Response, NextFunction } from "express";
export declare const addProductToCartControllerBase: (addProductToCartUseCase: AddProductToCartUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const addProductToCartController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
