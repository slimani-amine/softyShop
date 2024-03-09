import { exceptionService } from "../../../core/errors/exceptions";
import {
  ICategoryRepository,
  categoryRepo,
} from "../../../data/repositories/category.repository";

export type DeleteCategoryUseCaseType = (params: {
  [id: string]: any;
}) => Promise<{ success: boolean }>;

export const deleteCategoryUseCaseBase =
  (
    dependencies: {
      categoryRepo: ICategoryRepository;
    } = {
      categoryRepo: categoryRepo,
    }
  ): DeleteCategoryUseCaseType =>
  async (params: { [id: string]: any }) => {
    const category = await dependencies.categoryRepo.findOne({
      where: { id: params.categoryId },
    });

    if (!category) {
      exceptionService.notFoundException({
        message: "Category not found",
      });
    }

    const result = await dependencies.categoryRepo.deleteCategory(category);

    return {
      success: result === 1,
    };
  };

export const deleteCategoryUseCase: DeleteCategoryUseCaseType =
  deleteCategoryUseCaseBase({
    categoryRepo,
  });
