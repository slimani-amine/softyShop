import { DeleteProductFromCartUseCaseType } from "../../../../usecases/api/cartProduct/deleteProductFromCart.usecase";
import { NextFunction, Request, Response } from "express";
export declare const deleteProductFromCartControllerBase: (deleteProductFromCartUseCase: DeleteProductFromCartUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteProductFromCartController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
