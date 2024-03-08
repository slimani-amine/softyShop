import { ICategoryRepository, categoryRepo } from "../../../data/repositories/category.repository";
import { ICategory } from "../../../domain/category/category";
export type getAllCategoriesUseCaseType = (queryParams: {
    [key: string]: any;
}) => Promise<ICategory[]>;
export declare const getAllCategoriesUseCaseBase: (dependencies: {
    categoryRepo: ICategoryRepository;
}) => (queryParams: {
    [key: string]: any;
}) => Promise<ICategory[]>;
export declare const getAllCategoriesUseCase: (queryParams: {
    [key: string]: any;
}) => Promise<ICategory[]>;
