import {
  IBrandRepository,
  brandRepo,
} from "../../../data/repositories/brand.repository";
import { IBrand } from "../../../domain/brand/brand";

export type GetProductBrandsUseCaseType = (queryParams: {
  storeId: string;
  productId: string;
}) => Promise<IBrand[]>;

export const getProductBrandsUseCaseBase =
  (dependencies: { brandsRepo: IBrandRepository }) =>
  async (queryParams: {
    storeId: string;
    productId: string;
  }): Promise<IBrand[]> => {
    const { storeId, productId } = queryParams;

    const productBrands = (await dependencies.brandsRepo.getProductBrands({
      storeId,
      productId,
    })) as any;

    return productBrands;
  };

export const getProductBrandsUseCase = getProductBrandsUseCaseBase({
  brandsRepo: brandRepo,
});
