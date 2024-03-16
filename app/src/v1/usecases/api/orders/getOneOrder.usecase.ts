import { IOrder } from "../../../domain/order/order";
import {
  IOrderRepository,
  orderRepo,
} from "../../../data/repositories/orders.repository";
import { exceptionService } from "../../../core/errors/exceptions";

export type getOrderByIdUseCaseType = (orderId: string) => Promise<IOrder>;

export const getOrderByIdUseCaseBase =
  (
    dependencies: {
      orderRepo: IOrderRepository;
    } = {
      orderRepo: orderRepo,
    }
  ): getOrderByIdUseCaseType =>
  async (orderId: string) => {
    const order = await dependencies.orderRepo.findOne({
      relations: {
        address: true,
        paymentMethod: true,
        cart: true,
      },
      where: { id: orderId },
      select: {
        id: true,
        estimatedDeliveryDate: true,
        status: true,
        isPaied: true,
        address: {
          id: true,
          address: true,
          city: true,
          state: true,
        },
        paymentMethod: {
          id: true,
          name: true,
        },
        cart: {
          id: true,
          totalAmount: true,
          totalQuantity: true,
        },
      },
    });

    if (!order) {
      exceptionService.notFoundException({
        message: "Order not found",
      });
    }

    return order;
  };

export const getOrderByIdUseCase: getOrderByIdUseCaseType =
  getOrderByIdUseCaseBase({
    orderRepo,
  });
