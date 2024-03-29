import {
  CreateWishlistUseCaseType,
  createWishlistUseCase,
} from "../../../../usecases/api/wishlist/addProductToWishlist.usecase";
import { Request, Response, NextFunction } from "express";

export const createWishlistControllerBase =
  (createWishlistUseCase: CreateWishlistUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {      
      req.body.userId = req.user.id;
      
      const result = await createWishlistUseCase(req.body);

      res.status(201).send({
        message: "Wishlist created successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const createWishlistController = createWishlistControllerBase(
  createWishlistUseCase
);
