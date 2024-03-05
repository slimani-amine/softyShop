import { IProduct } from "app/src/v1/domain/product/product";
import {
  IProductRepository,
  productRepo,
} from "../../../data/repositories/product.repository";

export type UpdateProductUseCaseType = (
  product: IProduct,
  updatePayload: Partial<IProduct>
) => Promise<IProduct>;

export const updateProductUseCaseBase =
  (productRepository: IProductRepository) =>
  async (product: IProduct, updatePayload: Partial<IProduct>) => {

    const updatedProduct = await productRepository.updateProduct(
      product,
      updatePayload
    );
    return updatedProduct;
  };

export const updateProductUseCase: UpdateProductUseCaseType =
  updateProductUseCaseBase(productRepo);