import { usersRepo } from "../../../../data/repositories/users.repository";
import {
  GetCartUseCaseType,
  getCartUseCase,
} from "../../../../usecases/api/cart/getCart.usecase";
import { NextFunction, Request, Response } from "express";

export const getCartControllerBase =
  (getCartUseCase: GetCartUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cartId = req.user.cartId;
      if (!cartId) {
        res.status(404).send({
          message: "you have not a cart ",
        });
      } else {
        const result = await getCartUseCase({ cartId });
        res.status(200).send({
          message: "success",
          data: result,
        });
      }
    } catch (err) {
      next(err);
    }
  };

export const getCartController = getCartControllerBase(getCartUseCase);
