import {
  GetWishlistsByUserUseCaseType,
  getWishlistsByUserUseCase,
} from "../../../../usecases/api/wishlist/getUserWishlists.usecase";
import { NextFunction, Request, Response } from "express";

export const getWishlistsByUserControllerBase =
  (getWishlistsByUserUseCase: GetWishlistsByUserUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const result = await getWishlistsByUserUseCase(userId);
      res.status(200).send({
        message: "success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const getWishlistsByUserController = getWishlistsByUserControllerBase(
  getWishlistsByUserUseCase
);
