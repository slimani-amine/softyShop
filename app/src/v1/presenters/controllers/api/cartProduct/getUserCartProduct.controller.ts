import { usersRepo } from "../../../../data/repositories/users.repository";
import {
  getUserCartProductUseCase,
  getUserCartProductUseCaseType,
} from "../../../../usecases/api/cartProduct/getUserCartProduct.usecase";
import { NextFunction, Request, Response } from "express";

export const getUserCartProductControllerBase =
  (getUserCartProductUseCase: getUserCartProductUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const cartId = req.user.cartId;

    try {
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
