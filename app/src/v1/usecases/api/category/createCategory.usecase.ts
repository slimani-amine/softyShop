import { exceptionService } from "../../../core/errors/exceptions";
import {
  ICategoryRepository,
  categoryRepo,
} from "../../../data/repositories/category.repository";
import {
  ICategory,
  ICreateCategoryInput,
} from "../../../domain/category/category";
import createCategorySchema from "../../../presenters/schemas/category/createCategory.schema";
import { trimAndValidateSchemaPayload } from "../../../utils/validation/validate.schema";

export type CreateCategoryUseCaseType = (
  payload: ICreateCategoryInput
) => Promise<{ category: ICategory }>;

export const createCategoryUseCaseBase =
  (
    dependencies: {
      categoryRepo: ICategoryRepository;
    } = {
      categoryRepo: categoryRepo,
    }
  ): CreateCategoryUseCaseType =>
  async (payload: ICreateCategoryInput) => {
    const categoryFound = await dependencies.categoryRepo.findAll({
      where: [{ name: payload.name }],
    });

    if (categoryFound.length > 0) {
      exceptionService.badRequestException({
        message: "A category with the given name already exists",
      });
    }

    validateCreateCategoryPayload(payload);
    const categoryCreated = await dependencies.categoryRepo.createCategory({
      name: payload.name,
      icon: payload.icon,
    });

    return {
      category: categoryCreated,
    };
  };

export function validateCreateCategoryPayload(
  payload: ICreateCategoryInput
): ICreateCategoryInput {
  trimAndValidateSchemaPayload<ICreateCategoryInput>(
    createCategorySchema,
    payload
  );
  return payload;
}

export const createCategoryUseCase: CreateCategoryUseCaseType =
  createCategoryUseCaseBase({
    categoryRepo,
  });
