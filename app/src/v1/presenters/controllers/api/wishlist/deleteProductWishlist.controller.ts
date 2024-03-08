import {
  DeleteWishlistUseCaseType,
  deleteWishlistUseCase,
} from "../../../../usecases/api/wishlist/deleteProductWishlist.usecase";

import { NextFunction, Request, Response } from "express";

export const deleteWishlistControllerBase =
  (deleteWishlistUseCase: DeleteWishlistUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    req.params.userId = req.user.id;
    try {
      const result = await deleteWishlistUseCase(req?.params);
      res.status(200).send({
        message: "success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const deleteWishlistController = deleteWishlistControllerBase(
  deleteWishlistUseCase
);
