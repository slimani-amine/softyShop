import { exceptionService } from "../../../core/errors/exceptions";
import { trimAndValidateSchemaPayload } from "../../../utils/validation/validate.schema";
import {
  IProductCreator,
  ICreateProductCreatorInput,
} from "../../../domain/productCreator/productCreator";
import {
  IProductCreatorRepository,
  productCreatorRepo,
} from "../../../data/repositories/productCreator.repository";
import createProductCreatorSchema from "../../../presenters/schemas/productCreator/createProductCreator.schema";

export type createProductCreatorUseCaseType = (
  payload: ICreateProductCreatorInput
) => Promise<{ productCreator: IProductCreator }>;

export const createProductCreatorUseCaseBase =
  (
    dependencies: {
      productCreatorRepo: IProductCreatorRepository;
    } = {
      productCreatorRepo: productCreatorRepo,
    }
  ): createProductCreatorUseCaseType =>
  async (payload: ICreateProductCreatorInput) => {
    const productCreatorFound = await dependencies.productCreatorRepo.findAll({
      where: [{ name: payload.name }],
    });

    if (productCreatorFound.length > 0) {
      exceptionService.badRequestException({
        message: "A product Creator with the given name already exists",
      });
    }
    validateCreateProductCreatorPayload(payload);

    const productCreatorCreated =
      await dependencies.productCreatorRepo.createProductCreator({
        name: payload.name,
        store_id: payload.store_id,
      });

    return {
      productCreator: productCreatorCreated,
    };
  };

export function validateCreateProductCreatorPayload(
  payload: ICreateProductCreatorInput
): ICreateProductCreatorInput {
  trimAndValidateSchemaPayload<ICreateProductCreatorInput>(
    createProductCreatorSchema,
    payload
  );
  return payload;
}

export const createProductCreatorUseCase: createProductCreatorUseCaseType =
  createProductCreatorUseCaseBase({
    productCreatorRepo,
  });
