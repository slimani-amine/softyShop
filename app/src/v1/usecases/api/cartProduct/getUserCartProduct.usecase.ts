import { cartRepo } from "../../../data/repositories/cart.repsitory";
import {
  ICartProductRepository,
  cartProductRepo,
} from "../../../data/repositories/cartProduct.repository";
import { ICart } from "../../../domain/cart/cart";
import { CartProductEntity } from "../../../data/orm_models/cartProduct.entity";

export type getUserCartProductUseCaseType = (queryParams: {
  cartId: string;
}) => Promise<(CartProductEntity[] | ICart)[]>;

export const getUserCartProductUseCaseBase =
  (dependencies: { cartProductRepo: ICartProductRepository }) =>
  async (queryParams: {
    cartId: string;
  }): Promise<(CartProductEntity[] | ICart)[]> => {
    const { cartId } = queryParams;

    const cartProduct = await dependencies.cartProductRepo.findAll({
      relations: {
        product: true,
      },
      where: {
        cart: { id: cartId },
      },
    });

    const cart = await cartRepo.findOne({
      where: {
        id: cartId.toString(),
      },
    });

    return [cart, cartProduct];
  };

export const getUserCartProductUseCase = getUserCartProductUseCaseBase({
  cartProductRepo: cartProductRepo,
});
