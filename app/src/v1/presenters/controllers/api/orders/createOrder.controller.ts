import {
  createOrderUseCase,
  createOrderUseCaseType,
} from "../../../../usecases/api/orders/createOrder.usecase";
import { NextFunction, Request, Response } from "express";

const createOrderControllerBase =
  (createOrderUseCase: createOrderUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    req.body.store_id = req.user.cartId;
    try {
      const result = await createOrderUseCase(req?.body);
      return res.status(201).json({
        message: "Order added successfully",
        data: {
          order: result.order,
        },
      });
    } catch (error) {
      next(error);
    }
  };

const createOrderController = createOrderControllerBase(createOrderUseCase);
export { createOrderControllerBase, createOrderController };
