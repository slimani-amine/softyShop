import { Request, Response, NextFunction } from "express";
import {
  updateOrderUseCaseType,
  updateOrderUseCase,
} from "../../../../usecases/api/orders/updateOrder.usecase";
import { exceptionService } from "../../../../core/errors/exceptions";
import { orderRepo } from "../../../../data/repositories/orders.repository";
import { addressRepo } from "../../../../data/repositories/addresses.repository";
import { paymentMethodRepo } from "../../../../data/repositories/paymentMethod.repository";
import { IOrder } from "../../../../domain/order/order";
import { trimAndValidateSchemaPayload } from "../../../../utils/validation/validate.schema";
import updateOrderSchema from "../../../schemas/orders/updateOrder.schema";

export const updateOrderControllerBase =
  (updateOrderUseCase: updateOrderUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId = req.params.id;
      const order = await orderRepo.findOne({ where: { id: orderId } });

      if (!order) {
        exceptionService.badRequestException({
          message: "Order not found",
        });
      }

      const address = await addressRepo.findOne({
        where: { id: req.body.address_id },
      });

      if (!address) {
        exceptionService.badRequestException({
          message: "address not found",
        });
      }

      const paymentMethod = await paymentMethodRepo.findOne({
        where: { id: req.body.paymentMethod_id },
      });

      if (!paymentMethod) {
        exceptionService.badRequestException({
          message: "payment Method not found",
        });
      }

      const updatePayload = {
        paymentMethod,
        address,
      };
      validateUpdateOrderPayload(req.body);
      const result = await updateOrderUseCase(order, updatePayload);

      res.status(200).send({
        message: "Order updated successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
export function validateUpdateOrderPayload(
  payload: Partial<IOrder>
): Partial<IOrder> {
  trimAndValidateSchemaPayload<Partial<IOrder>>(updateOrderSchema, payload);
  return payload;
}

export const updateOrderController =
  updateOrderControllerBase(updateOrderUseCase);
