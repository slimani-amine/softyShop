import { IOrder } from "../../../domain/order/order";
import {
  IOrderRepository,
  orderRepo,
} from "../../../data/repositories/orders.repository";
import { cartRepo } from "../../../data/repositories/cart.repsitory";
import { usersRepo } from "../../../data/repositories/users.repository";

export type payOrderUseCaseType = (
  order: IOrder,
  payload: Partial<IOrder>,
  userId: string
) => Promise<IOrder>;

export const payOrderUseCaseBase =
  (
    dependencies: {
      orderRepo: IOrderRepository;
    } = {
      orderRepo: orderRepo,
    }
  ): payOrderUseCaseType =>
  async (order: IOrder, payload: Partial<IOrder>, userId: string) => {
    const cart = await cartRepo.createCart();
    const user = await usersRepo.findOne({
      where: {
        id: userId,
      },
    });
    const updateUser = await usersRepo.updateOne(user, {cart});

    const paydOrder = await dependencies.orderRepo.updateOrder(
      order,
      payload as any
    );

    return paydOrder;
  };

export const payOrderUseCase: payOrderUseCaseType = payOrderUseCaseBase({
  orderRepo,
});
