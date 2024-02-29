import { ICategoryRepository } from "../../../data/repositories/category.repository";
import { ICategory } from "../../../domain/Category/Category";
export type UpdateCategoryUseCaseType = (Category: ICategory, updatePayload: Partial<ICategory>) => Promise<ICategory>;
export declare const updateCategoryUseCaseBase: (CategoryRepository: ICategoryRepository) => (Category: ICategory, updatePayload: Partial<ICategory>) => Promise<ICategory>;
export declare const updateCategoryUseCase: UpdateCategoryUseCaseType;
