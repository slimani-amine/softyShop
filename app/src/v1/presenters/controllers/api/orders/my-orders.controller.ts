import { Request, Response, NextFunction } from "express";
import {
  myOrdersUseCaseType,
  myOrdersUseCase,
} from "../../../../usecases/api/orders/my-orders.usecase";
import { exceptionService } from "../../../../core/errors/exceptions";

export const myOrdersControllerBase =
  (myOrdersUseCase: myOrdersUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const order = await myOrdersUseCase(userId);

      if (!order) {
        exceptionService.notFoundException({
          message: "Order not found",
        });
      }

      res.status(200).send({
        message: "Order retrieved successfully",
        data: order,
      });
    } catch (err) {
      next(err);
    }
  };

export const myOrdersController = myOrdersControllerBase(myOrdersUseCase);
