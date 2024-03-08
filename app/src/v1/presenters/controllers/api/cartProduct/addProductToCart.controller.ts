import {
  AddProductToCartUseCaseType,
  addProductToCartUseCase,
} from "../../../../usecases/api/cartProduct/addProductToCart.usecase";
import { Request, Response, NextFunction } from "express";

export const addProductToCartControllerBase =
  (addProductToCartUseCase: AddProductToCartUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body.cartId = req.user.cartId;

      const result = await addProductToCartUseCase(req.body);

      res.status(201).send({
        message: "Product added to cart successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const addProductToCartController = addProductToCartControllerBase(
  addProductToCartUseCase
);
