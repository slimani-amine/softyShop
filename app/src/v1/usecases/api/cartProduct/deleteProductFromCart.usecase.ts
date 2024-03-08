import {
  ICartProductRepository,
  cartProductRepo,
} from "../../../data/repositories/cartProduct.repository";
import { exceptionService } from "../../../core/errors/exceptions";
import { cartRepo } from "../../../data/repositories/cart.repsitory";
import { ICart } from "../../../domain/cart/cart";

export type DeleteProductFromCartUseCaseType = (params: {
  [id: string]: any;
}) => Promise<{ success: boolean }>;

export const deleteProductFromCartUseCaseBase =
  (
    dependencies: {
      cartProductRepo: ICartProductRepository;
    } = {
      cartProductRepo: cartProductRepo,
    }
  ): DeleteProductFromCartUseCaseType =>
  async (params: { [id: string]: any }) => {
    const cart = (await cartRepo.findOne({
      select: {
        cartProducts: true,
      },
      where: { id: params.cartId },
    })) as any;
    if (!cart) {
      exceptionService.notFoundException({
        message: "cart not found",
      });
    }

    const product = await dependencies.cartProductRepo.findOne({
      relations: {
        product: true,
      },
      where: { product: { id: params.cartProductId } },
    });
    console.log("🚀 ~ product:", product)
    if (!product) {
      exceptionService.notFoundException({
        message: "product not found",
      });
    }

    // const sommeQuantities = cart.totalQuantity * 1 - product.quantity * 1;
    // const sommePrice = cart.totalAmount * 1 - product.product.price * 1;

    // const updatedCart = await cartRepo.updateCart(cart, {
    //   totalQuantity: sommeQuantities,
    //   totalAmount: sommePrice,
    // });
    // console.log("🚀 ~ updatedCart:", updatedCart)

    const result =
      await dependencies.cartProductRepo.deleteCartProduct(product);

    return {
      success: result === 1,
    };
  };
export const deleteProductFromCartUseCase: DeleteProductFromCartUseCaseType =
  deleteProductFromCartUseCaseBase({
    cartProductRepo,
  });
