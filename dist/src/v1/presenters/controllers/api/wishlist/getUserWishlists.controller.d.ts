import { GetWishlistsByUserUseCaseType } from "../../../../usecases/api/wishlist/getUserWishlists.usecase";
import { NextFunction, Request, Response } from "express";
export declare const getWishlistsByUserControllerBase: (getWishlistsByUserUseCase: GetWishlistsByUserUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getWishlistsByUserController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
