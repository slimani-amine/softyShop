import {
  ICartRepository,
  cartRepo,
} from "../../../data/repositories/cart.repsitory";
import { ICart } from "../../../domain/cart/cart";

export type GetCartUseCaseType = (queryParams: {
  cartId: string;
}) => Promise<ICart>;

export const getCartUseCaseBase =
  (dependencies: { cartRepo: ICartRepository }) =>
  async (queryParams: { cartId: string }): Promise<ICart> => {
    const { cartId } = queryParams;

    const cart = (await dependencies.cartRepo.findOne({
      where: {
        id: cartId.toString(),
      },
    })) as any;

    return cart;
  };

export const getCartUseCase = getCartUseCaseBase({
  cartRepo: cartRepo,
});
