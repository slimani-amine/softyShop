import {
  IProductRepository,
  productRepo,
} from "../../../data/repositories/Product.repository";
import { storeRepo } from "../../../data/repositories/store.repository";
import { exceptionService } from "../../../core/errors/exceptions";
import { IProduct } from "app/src/v1/domain/product/product";

export type GetStoreProductUseCaseType = (queryParams: {
  storeId: string;
}) => Promise<IProduct[]>;

export const getStoreProductUseCaseBase =
  (dependencies: { productRepo: IProductRepository }) =>
  async (queryParams: { storeId: string }) => {
    const store = await storeRepo.findOne({
      where: { id: queryParams.storeId },
    });
    if (!store) {
      exceptionService.notFoundException({
        message: "store not found",
      });
    }
    const productsFound = await dependencies.productRepo.findAll({
      where: { store: store },
      // select: {
      //   name: true,
      //   price: true,
      //   stockNumber: true,
      //   isPublished: true,
      //   isAccepted: true,
      //   publishedAt: true,
      //   availability: true,
      // },
      // relations: {
      //   store: true,
      //   review: true,
      // },
      cache: true,
    });

    return productsFound;
  };

export const getStoreProductUseCase = getStoreProductUseCaseBase({
  productRepo: productRepo,
});
