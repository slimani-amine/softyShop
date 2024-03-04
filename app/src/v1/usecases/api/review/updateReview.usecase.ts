import {
  ICategoryRepository,
  categoryRepo,
} from "../../../data/repositories/category.repository";
import { ICategory } from "../../../domain/Category/Category";

export type UpdateCategoryUseCaseType = (
  Category: ICategory,
  updatePayload: Partial<ICategory>
) => Promise<ICategory>;

export const updateCategoryUseCaseBase =
  (CategoryRepository: ICategoryRepository) =>
  async (Category: ICategory, updatePayload: Partial<ICategory>) => {
    const updatedCategory = await CategoryRepository.updateCategory(
      Category,
      updatePayload
    );
    return updatedCategory;
  };

export const updateCategoryUseCase: UpdateCategoryUseCaseType =
  updateCategoryUseCaseBase(categoryRepo);
