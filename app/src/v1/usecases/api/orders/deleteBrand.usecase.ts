import {
  IBrandRepository,
  brandRepo,
} from "../../../data/repositories/brand.repository";
import { exceptionService } from "../../../core/errors/exceptions";

export type DeleteBrandUseCaseType = (queryParams: {
  [id: string]: any;
}) => Promise<number>;

export const deleteBrandUseCaseBase =
  (dependencies: { brandRepo: IBrandRepository }) =>
  async (queryParams: { [id: string]: any }) => {
    const brand = await dependencies.brandRepo.findOne({
      where: { id: queryParams.brandId },
    });

    if (!brand) {
      exceptionService.notFoundException({
        message: "Brand not found",
      });
    }

    const brandsFound = await dependencies.brandRepo.deleteBrand(brand);

    return brandsFound;
  };

export const deleteBrandUseCase = deleteBrandUseCaseBase({
  brandRepo: brandRepo,
});
