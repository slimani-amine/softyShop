import {
  getUserCartProductUseCase,
  getUserCartProductUseCaseType,
} from "../../../../usecases/api/cartProduct/getUserCartProduct.usecase";
import { NextFunction, Request, Response } from "express";

export const getUserCartProductControllerBase =
  (getUserCartProductUseCase: getUserCartProductUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cartId = req.params.cartId;
      const result = await getUserCartProductUseCase({ cartId });
      res.status(200).send({
        message: "success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const getUserCartProductController = getUserCartProductControllerBase(
  getUserCartProductUseCase
);
