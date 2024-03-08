import { trimAndValidateSchemaPayload } from "../../../utils/validation/validate.schema";

import { exceptionService } from "../../../core/errors/exceptions";
import {
  ICartProductRepository,
  cartProductRepo,
} from "../../../data/repositories/cartProduct.repository";
import createCartProductSchema from "../../../presenters/schemas/cartProduct/createCartProduct.schema";
import {
  ICartProduct,
  ICreateCartProductInput,
} from "../../../domain/cartProduct/cartProduct";
import { cartRepo } from "../../../data/repositories/cart.repsitory";
import { ICart } from "../../../domain/cart/cart";

export type AddProductToCartUseCaseType = (
  payload: ICreateCartProductInput
) => Promise<{ cartProduct: any }>;

export const addProductToCartUseCaseBase =
  (
    dependencies: {
      cartProductRepo: ICartProductRepository;
    } = {
      cartProductRepo: cartProductRepo,
    }
  ): AddProductToCartUseCaseType =>
  async (payload: ICreateCartProductInput) => {
    validateCreateCartProductPayload(payload);

    const existingCart = (await cartRepo.findOne({
      where: {
        id: payload.cartId,
      },
    })) as any;

    if (!existingCart) {
      exceptionService.notFoundException({
        message: "cart not found",
      });
    }
    const existingCartProduct = (await cartProductRepo.findOne({
      relations: {
        product: true,
      },
      where: {
        product: { id: payload.productId },
        cart: { id: payload.cartId },
      },
    })) as any;

    if (existingCartProduct?.quantity === payload?.quantity) {
      exceptionService.notFoundException({
        message: "This product is already in the cart",
      });
    } else if (existingCartProduct?.quantity > payload?.quantity) {
      const cartProductCreated =
        await dependencies.cartProductRepo.updateCartProduct(
          existingCartProduct,
          {
            quantity: payload?.quantity * 1,
          }
        );

      return {
        cartProduct: cartProductCreated,
      };
    } else if (existingCartProduct?.quantity < payload?.quantity) {
      const cartProductCreated =
        await dependencies.cartProductRepo.updateCartProduct(
          existingCartProduct,
          {
            quantity: payload?.quantity * 1,
          }
        );

      return {
        cartProduct: cartProductCreated,
      };
    } else {
      const cartProductCreated =
        await dependencies.cartProductRepo.createCartProduct({
          quantity: payload.quantity,
          productId: payload.productId,
          cartId: payload.cartId,
        });

      return {
        cartProduct: cartProductCreated,
      };
    }
  };

export function validateCreateCartProductPayload(
  payload: ICreateCartProductInput
): ICreateCartProductInput {
  trimAndValidateSchemaPayload<ICreateCartProductInput>(
    createCartProductSchema,
    payload
  );
  return payload;
}

export const addProductToCartUseCase: AddProductToCartUseCaseType =
  addProductToCartUseCaseBase();
