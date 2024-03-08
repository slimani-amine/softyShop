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

    let sommeQuantities = 0;
    for (let i = 0; i < cartProduct.length; i++) {
      sommeQuantities += cartProduct[i].quantity;
    }
    let sommePrice = 0;
    for (let i = 0; i < cartProduct.length; i++) {
      sommePrice += cartProduct[i].product.price*cartProduct[i].quantity;
    }

    const cart = (await cartRepo.findOne({
      where: {
        id: cartId.toString(),
      },
    })) as any;

    const newCart = await cartRepo.updateCart(cart, {
      totalQuantity: sommeQuantities,
      totalAmount: sommePrice,
    });

    return [newCart, cartProduct];
  };

export const getUserCartProductUseCase = getUserCartProductUseCaseBase({
  cartProductRepo: cartProductRepo,
});
