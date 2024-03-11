import { exceptionService } from "../../../../core/errors/exceptions";
import {
  DeleteProductFromCartUseCaseType,
  deleteProductFromCartUseCase,
} from "../../../../usecases/api/cartProduct/deleteProductFromCart.usecase";
import { NextFunction, Request, Response } from "express";

export const deleteProductFromCartControllerBase =
  (deleteProductFromCartUseCase: DeleteProductFromCartUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const cartId = req?.user?.cartId;
    try {
      if (!cartId) {
        exceptionService.notFoundException({
          message: "you have not a cart ",
        });
      }
      req.params.cartId = cartId;
      const result = await deleteProductFromCartUseCase(req?.params);
      res.status(200).send({
        message: "success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const deleteProductFromCartController =
  deleteProductFromCartControllerBase(deleteProductFromCartUseCase);
