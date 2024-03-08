import { DeleteWishlistUseCaseType } from "../../../../usecases/api/wishlist/deleteProductWishlist.usecase";
import { NextFunction, Request, Response } from "express";
export declare const deleteWishlistControllerBase: (deleteWishlistUseCase: DeleteWishlistUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteWishlistController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
