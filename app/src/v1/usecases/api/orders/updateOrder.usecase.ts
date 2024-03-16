import { IOrder } from "../../../domain/order/order";
import {
  IOrderRepository,
  orderRepo,
} from "../../../data/repositories/orders.repository";

export type updateOrderUseCaseType = (
  order: IOrder,
  payload: Partial<IOrder>
) => Promise<IOrder>;

export const updateOrderUseCaseBase =
  (
    dependencies: {
      orderRepo: IOrderRepository;
    } = {
      orderRepo: orderRepo,
    }
  ): updateOrderUseCaseType =>
  async (order: IOrder, payload: Partial<IOrder>) => {
    const updatedOrder = await dependencies.orderRepo.updateOrder(
      order,
      payload as any
    );

    return updatedOrder;
  };

export const updateOrderUseCase: updateOrderUseCaseType =
  updateOrderUseCaseBase({
    orderRepo,
  });
