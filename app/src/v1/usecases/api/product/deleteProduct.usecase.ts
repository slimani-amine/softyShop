import { storeRepo } from "../../../data/repositories/store.repository";
import { exceptionService } from "../../../core/errors/exceptions";
import {
  IProductRepository,
  productRepo,
} from "../../../data/repositories/product.repository";

export type DeleteProductUseCaseType = (queryParams: {
  [id: string]: any;
}) => Promise<number>;

export const deleteProductUseCaseBase =
  (dependencies: { productRepo: IProductRepository }) =>
  async (queryParams: { [id: string]: any }) => {
    const store = await storeRepo.findOne({ where: { id: queryParams.id } });
    if (!store) {
      exceptionService.notFoundException({
        message: "store not found",
      });
    }
    const product = await dependencies.productRepo.findOne({
      where: { id: queryParams.productId },
    });

    if (!product) {
      exceptionService.notFoundException({
        message: "product not found",
      });
    }

    const productFound = await dependencies.productRepo.deleteProduct(product);

    return productFound;
  };

export const deleteProductUseCase = deleteProductUseCaseBase({
  productRepo: productRepo,
});
