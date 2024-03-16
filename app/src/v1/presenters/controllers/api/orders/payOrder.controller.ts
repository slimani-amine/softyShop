import { Request, Response, NextFunction } from "express";
import {
  payOrderUseCaseType,
  payOrderUseCase,
} from "../../../../usecases/api/orders/payOrder.usecase";
import { exceptionService } from "../../../../core/errors/exceptions";
import { orderRepo } from "../../../../data/repositories/orders.repository";

export const payOrderControllerBase =
  (payOrderUseCase: payOrderUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId = req.params.id;
      const userId = req.user.id;
      const order = await orderRepo.findOne({ where: { id: orderId } });

      if (!order) {
        exceptionService.badRequestException({
          message: "Order not found",
        });
      }

      if (order.isPaied) {
        exceptionService.badRequestException({
          message: "Already Paied",
        });
      }

      const updatePayload = {
        isPaied: true,
        
      }

      const result = await payOrderUseCase(order, updatePayload,userId,);

      res.status(200).send({
        message: "Order updated successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const payOrderController = payOrderControllerBase(payOrderUseCase);
