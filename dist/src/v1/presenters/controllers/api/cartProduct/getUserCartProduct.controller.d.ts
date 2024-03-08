import { getUserCartProductUseCaseType } from "../../../../usecases/api/cartProduct/getUserCartProduct.usecase";
import { NextFunction, Request, Response } from "express";
export declare const getUserCartProductControllerBase: (getUserCartProductUseCase: getUserCartProductUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getUserCartProductController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
