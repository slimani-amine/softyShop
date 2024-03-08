import {
  GetCartUseCaseType,
  getCartUseCase,
} from "../../../../usecases/api/cart/getCart.usecase";
import { NextFunction, Request, Response } from "express";

export const getCartControllerBase =
  (getCartUseCase: GetCartUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const cartId = req.params.cartId; 

    try {
      const result = await getCartUseCase({ cartId });
      res.status(200).send({
        message: "Success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const getCartController = getCartControllerBase(getCartUseCase);
