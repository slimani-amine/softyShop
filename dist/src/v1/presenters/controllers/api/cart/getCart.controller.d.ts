import { GetCartUseCaseType } from "../../../../usecases/api/cart/getCart.usecase";
import { NextFunction, Request, Response } from "express";
export declare const getCartControllerBase: (getCartUseCase: GetCartUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getCartController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
