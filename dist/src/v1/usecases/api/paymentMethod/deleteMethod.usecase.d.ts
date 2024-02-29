import { ICategoryRepository, categoryRepo } from "../../../data/repositories/category.repository";
export type DeleteCategoryUseCaseType = (params: {
    [id: string]: any;
}) => Promise<{
    success: boolean;
}>;
export declare const deleteCategoryUseCaseBase: (dependencies?: {
    categoryRepo: ICategoryRepository;
}) => DeleteCategoryUseCaseType;
export declare const deleteCategoryUseCase: DeleteCategoryUseCaseType;
