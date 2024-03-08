import { CreateWishlistUseCaseType } from "../../../../usecases/api/wishlist/addProductToWishlist.usecase";
import { Request, Response, NextFunction } from "express";
export declare const createWishlistControllerBase: (createWishlistUseCase: CreateWishlistUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createWishlistController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
