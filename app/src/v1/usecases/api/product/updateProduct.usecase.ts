import {
  IProductRepository,
  productRepo,
} from "../../../data/repositories/product.repository";
import { IProduct } from "../../../domain/product/product";

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