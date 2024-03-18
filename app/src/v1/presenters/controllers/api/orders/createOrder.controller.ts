import { cartRepo } from "../../../../data/repositories/cart.repsitory";
import { orderRepo } from "../../../../data/repositories/orders.repository";
import {
  createOrderUseCase,
  createOrderUseCaseType,
} from "../../../../usecases/api/orders/createOrder.usecase";
import { NextFunction, Request, Response } from "express";
import { exceptionService } from "../../../../core/errors/exceptions";

const createOrderControllerBase =
  (createOrderUseCase: createOrderUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    req.body.cartId = req.user.cartId;
    req.body.userId = req.user.id;
    try {
      const cart = await cartRepo.findAll({
        relations: { cartProducts: true },
        where: { id: req.body.cartId },
        select: {
          cartProducts: true,
        },
      });

      if (cart[0].totalQuantity === 0) {
        exceptionService.notFoundException({
          message: "Empty Cart",
        });
      }
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
