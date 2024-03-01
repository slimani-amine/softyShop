
import { IBrand } from "app/src/v1/domain/brand/brand";
import {
  IBrandRepository,
  brandRepo,
} from "../../../data/repositories/brand.repository";

export type UpdateBrandUseCaseType = (
  brand: IBrand,
  updatePayload: Partial<IBrand>
) => Promise<IBrand | null>;

export const updateBrandUseCaseBase =
  (brandRepository: IBrandRepository) =>
  async (brand: IBrand, updatePayload: Partial<IBrand>) => {
    console.log("🚀 ~ updatePayload:", updatePayload);

    const updatedBrand = await brandRepository.updateBrand(
      brand,
      updatePayload as any
    );

    return updatedBrand;
  };

export const updateBrandUseCase: UpdateBrandUseCaseType =
  updateBrandUseCaseBase(brandRepo);