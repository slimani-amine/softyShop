import { QueryResult } from "../../../utils/querying/apiFeatures.util";
import {
  ICategoryRepository,
  categoryRepo,
} from "../../../data/repositories/category.repository";
import { ICategory } from "../../../domain/category/category";

export type getAllCategoriesUseCaseType = (queryParams: {
  [key: string]: any;
}) => Promise<QueryResult<ICategory>>;

export const getAllCategoriesUseCaseBase =
  (dependencies: { categoryRepo: ICategoryRepository }) =>
  async (queryParams: { [key: string]: any }) => {
    const storesFound =
      await dependencies.categoryRepo.findByQuery(queryParams);

    return storesFound;
  };

export const getAllCategoriesUseCase = getAllCategoriesUseCaseBase({
  categoryRepo: categoryRepo,
});
