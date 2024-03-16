import { IOrder } from "../../../domain/order/order";
import {
  IOrderRepository,
  orderRepo,
} from "../../../data/repositories/orders.repository";
import { exceptionService } from "../../../core/errors/exceptions";

export type myOrdersUseCaseType = (cartId: string) => Promise<IOrder[]>;

export const myOrdersUseCaseBase =
  (
    dependencies: {
      orderRepo: IOrderRepository;
    } = {
      orderRepo: orderRepo,
    }
  ): myOrdersUseCaseType =>
  async (userId: string) => {
    const orders = await dependencies.orderRepo.findAll({
      relations: { cart: true },
      where: {
        user: {
          id: userId,
        },
      },
      select: {
        id: true,
        status: true,
        isPaied: true,
        createdAt: true,
        cart: {
          totalAmount: true,
        },
      },
    });

    if (!orders || orders.length === 0) {
      exceptionService.notFoundException({
        message: "Order not found",
      });
    }

    return orders;
  };

export const myOrdersUseCase: myOrdersUseCaseType = myOrdersUseCaseBase({
  orderRepo,
});
