import { ICategory } from "app/src/v1/domain/category/category";
import { ICategoryRepository } from "../../../data/repositories/category.repository";
export type UpdateCategoryUseCaseType = (Category: ICategory, updatePayload: Partial<ICategory>) => Promise<ICategory>;
export declare const updateCategoryUseCaseBase: (CategoryRepository: ICategoryRepository) => (Category: ICategory, updatePayload: Partial<ICategory>) => Promise<ICategory>;
export declare const updateCategoryUseCase: UpdateCategoryUseCaseType;
