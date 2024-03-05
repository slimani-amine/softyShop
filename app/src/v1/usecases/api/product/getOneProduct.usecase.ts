import { IProduct } from "../../../domain/product/product";
import {
  IProductRepository,
  productRepo,
} from "../../../data/repositories/product.repository";
import { exceptionService } from "../../../core/errors/exceptions";

export type GetOneProductUseCaseType = (queryParams: {
  [id: string]: any;
}) => Promise<IProduct>;

export const getOneProductUseCaseBase =
  (dependencies: { productRepo: IProductRepository }) =>
  async (queryParams: { [id: string]: any }) => {
    const productFound = await dependencies.productRepo.findOne({
      where: { id: queryParams.productId },
    });

    if (!productFound) {
      exceptionService.notFoundException({
        message: "Product not found",
      });
    }

    return productFound;
  };

export const getOneProductUseCase = getOneProductUseCaseBase({
  productRepo: productRepo,
});
