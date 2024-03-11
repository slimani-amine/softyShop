import { exceptionService } from "../../../../core/errors/exceptions";
import {
  AddProductToCartUseCaseType,
  addProductToCartUseCase,
} from "../../../../usecases/api/cartProduct/addProductToCart.usecase";
import { Request, Response, NextFunction } from "express";

export const addProductToCartControllerBase =
  (addProductToCartUseCase: AddProductToCartUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const cartId = req?.user?.cartId;
    try {
      if (!cartId) {
        exceptionService.notFoundException({
          message: "you have not a cart ",
        });
      }
      req.body.cartId = cartId;

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
