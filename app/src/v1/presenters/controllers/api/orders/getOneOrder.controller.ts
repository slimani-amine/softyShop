import { Request, Response, NextFunction } from "express";
import {
  getOrderByIdUseCaseType,
  getOrderByIdUseCase,
} from "../../../../usecases/api/orders/getOneOrder.usecase";
import { exceptionService } from "../../../../core/errors/exceptions";

export const getOrderByIdControllerBase =
  (getOrderByIdUseCase: getOrderByIdUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId = req.params.id;
      const order = await getOrderByIdUseCase(orderId);

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

export const getOrderByIdController =
  getOrderByIdControllerBase(getOrderByIdUseCase);
