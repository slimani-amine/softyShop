import {
  IBrandRepository,
  brandRepo,
} from "../../../data/repositories/brand.repository";
import { IBrand } from "../../../domain/brand/brand";

export type GetStoreBrandsUseCaseType = (queryParams: {
  storeId: string;
}) => Promise<IBrand[]>;

export const getStoreBrandsUseCaseBase =
  (dependencies: { brandsRepo: IBrandRepository }) =>
  async (queryParams: { storeId: string }): Promise<IBrand[]> => {
    const storeId = queryParams;

    const StoreBrands = (await dependencies.brandsRepo.getStoreBrands(
      storeId
    )) as any;

    return StoreBrands;
  };

export const getStoreBrandsUseCase = getStoreBrandsUseCaseBase({
  brandsRepo: brandRepo,
});
