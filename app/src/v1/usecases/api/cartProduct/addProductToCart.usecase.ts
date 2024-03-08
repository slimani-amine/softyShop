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
import { cartRepo } from "app/src/v1/data/repositories/cart.repsitory";

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

    const existingCartProduct = await cartProductRepo.findOne({
      where: {
        product: { id: payload.productId },
        cart: { id: payload.cartId },
      },
    });

    if (existingCartProduct) {
      exceptionService.notFoundException({
        message: "This product is already in the cart",
      });
    }


    const cartProductCreated =
      await dependencies.cartProductRepo.createCartProduct({
        quantity: payload.quantity,
        productId: payload.productId,
        cartId: payload.cartId,
      });

    return {
      cartProduct: cartProductCreated,
    };
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
