import { ICategoryRepository, categoryRepo } from "../../../data/repositories/category.repository";
import { ICategory, ICreateCategoryInput } from "../../../domain/category/category";
export type CreateCategoryUseCaseType = (payload: ICreateCategoryInput) => Promise<{
    category: ICategory;
}>;
export declare const createCategoryUseCaseBase: (dependencies?: {
    categoryRepo: ICategoryRepository;
}) => CreateCategoryUseCaseType;
export declare function validateCreateCategoryPayload(payload: ICreateCategoryInput): ICreateCategoryInput;
export declare const createCategoryUseCase: CreateCategoryUseCaseType;
