import {
  ICartProductRepository,
  cartProductRepo,
} from "../../../data/repositories/cartProduct.repository";
import { exceptionService } from "../../../core/errors/exceptions";

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
    const product = await dependencies.cartProductRepo.findOne({
      where: { product: { id: params.productId } },
    });

    if (!product) {
      exceptionService.notFoundException({
        message: "product not found",
      });
    }

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
