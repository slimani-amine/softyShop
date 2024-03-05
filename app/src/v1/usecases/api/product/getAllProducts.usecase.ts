import { IProduct } from "app/src/v1/domain/product/product";
import {
  IProductRepository,
  productRepo,
} from "../../../data/repositories/product.repository";
import { QueryResult } from "../../../utils/querying/apiFeatures.util";

export type GetAllProductUseCaseType = (queryParams: {
  [key: string]: any;
}) => Promise<QueryResult<IProduct>>;

export const getAllProductUseCaseBase =
  (dependencies: {
    productRepo: IProductRepository;
  }): GetAllProductUseCaseType =>
  async (queryParams: { [key: string]: any }) => {
    const productsFound =
      await dependencies.productRepo.findByQuery(queryParams);
    return productsFound;
  };

export const getAllProductUseCase = getAllProductUseCaseBase({
  productRepo: productRepo,
});
