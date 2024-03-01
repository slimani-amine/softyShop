import { exceptionService } from "../../../core/errors/exceptions";
import { trimAndValidateSchemaPayload } from "../../../utils/validation/validate.schema";

import { usersRepo } from "../../../data/repositories/users.repository";
import { ACCOUNT_NOT_FOUND_ERROR_MESSAGE } from "../../../domain/auth/errors";
import { IBrand, ICreateBrandInput } from "../../../domain/brand/brand";
import {
  IBrandRepository,
  brandRepo,
} from "../../../data/repositories/brand.repository";
import createBrandSchema from "../../../presenters/schemas/brands/createBrand.schema";

export type createBrandUseCaseType = (
  payload: ICreateBrandInput
) => Promise<{ brand: IBrand }>;

export const createBrandUseCaseBase =
  (
    dependencies: {
      brandRepo: IBrandRepository;
    } = {
      brandRepo: brandRepo,
    }
  ): createBrandUseCaseType =>
  async (payload: ICreateBrandInput) => {
    // const product = await productsRepo.findOne({ where: { id: payload.product_id } });
    // if (!product) {
    //   exceptionService.notFoundException({
    //     message: "product nor found",
    //   });
    // }

    validateCreateBrandPayload(payload);
    const brandCreated = await dependencies.brandRepo.createBrand({
      name: payload.name,
      logo: payload.logo,
      product_id: payload.product_id,
    });

    return {
      brand: brandCreated,
    };
  };

export function validateCreateBrandPayload(
  payload: ICreateBrandInput
): ICreateBrandInput {
  trimAndValidateSchemaPayload<ICreateBrandInput>(createBrandSchema, payload);
  return payload;
}

export const createBrandUseCase: createBrandUseCaseType =
  createBrandUseCaseBase({
    brandRepo,
  });
