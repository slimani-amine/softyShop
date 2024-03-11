import { ICategory } from "app/src/v1/domain/category/category";
import {
  ICategoryRepository,
  categoryRepo,
} from "../../../data/repositories/category.repository";


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
