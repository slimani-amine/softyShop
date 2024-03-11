import { IProduct } from "../../../domain/product/product";
import {
  IProductRepository,
  productRepo,
} from "../../../data/repositories/product.repository";
import { exceptionService } from "../../../core/errors/exceptions";
import { storeRepo } from "../../../data/repositories/store.repository";
import { getStoreProductUseCase } from "./getStoreProducts.usecase";

export type GetOneProductUseCaseType = (queryParams: {
  [id: string]: any;
}) => Promise<IProduct>;

export const getOneProductUseCaseBase =
  (dependencies: { productRepo: IProductRepository }) =>
  async (queryParams: { [id: string]: any }) => {
    queryParams.storeId = queryParams.id;

    const storeProduct = await getStoreProductUseCase({
      storeId: queryParams.storeId,
    });
    console.log("🚀 ~ storeProduct:", storeProduct);

    if (!storeProduct) {
      exceptionService.notFoundException({
        message: "there is no product in this store",
      });
    }

    const product = storeProduct.filter((product) => {
      console.log(product.id == queryParams.productId);

      return product.id == queryParams.productId;
    });
    console.log("🚀 ~ product ~ product:", product);

    if (product.length === 0) {
      exceptionService.notFoundException({
        message: `there is no product in this store with this id ${queryParams.productId}`,
      });
      return;
    } else {
      const productFound = await dependencies.productRepo.findOne({
        relations: {
          category: true,
          store: true,
          brand: true,
        },
        where: { id: queryParams.productId, store: { id: queryParams.id } },
        select: {
          category: {
            id: true,
            name: true,
          },
          brand: {
            id: true,
            name: true,
          },
          store: {
            id: true,
            name: true,
          },
        },
      });

      if (!productFound) {
        exceptionService.notFoundException({
          message: "Product not found",
        });
      }

      return productFound;
    }
  };

export const getOneProductUseCase = getOneProductUseCaseBase({
  productRepo: productRepo,
});
