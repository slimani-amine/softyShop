import { IProduct } from "app/src/v1/domain/product/product";
import {
  IProductRepository,
  productRepo,
} from "../../../data/repositories/product.repository";

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
      throw new Error("Product not found");
    }

    return productFound;
  };

export const getOneProductUseCase = getOneProductUseCaseBase({
  productRepo: productRepo,
});