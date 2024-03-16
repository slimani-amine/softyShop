import { ICreateOrderInput, IOrder } from "../../../domain/order/order";
import { IOrderRepository, orderRepo } from "../../../data/repositories/orders.repository";

export type createOrderUseCaseType = (
  payload: ICreateOrderInput
) => Promise<{ order: IOrder }>;

export const createOrderUseCaseBase =
  (
    dependencies: {
      orderRepo: IOrderRepository;
    } = {
      orderRepo: orderRepo,
    }
  ): createOrderUseCaseType =>
  async (payload: ICreateOrderInput) => {
    const orderCreated = await dependencies.orderRepo.createOrder(payload);
    return {
      order: orderCreated,
    };
  };


export const createOrderUseCase: createOrderUseCaseType =
  createOrderUseCaseBase({
    orderRepo,
  });
