import { DataSource, QueryRunner, FindOneOptions, FindManyOptions } from "typeorm";
import { QueryResult } from "../../utils/querying/apiFeatures.util";
import { CategoryEntity } from "../orm_models/category.entity";
import { ICategory, ICreateCategoryInput } from "../../domain/category/category";
export declare const categoryRepoBase: (dbConnection: DataSource | QueryRunner) => {
    manager: import("typeorm").EntityManager;
    findOne(findData: FindOneOptions<CategoryEntity>): Promise<ICategory>;
    findAll(findData: FindManyOptions<CategoryEntity>): Promise<ICategory[]>;
    createCategory(payload: ICreateCategoryInput): Promise<ICategory>;
    deleteCategory(category: ICategory): Promise<number>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<ICategory>>;
    updateCategory(store: ICategory, payload: Partial<CategoryEntity>): Promise<ICategory>;
    toDomainCategories(categories: CategoryEntity[]): ICategory[];
    toDomainCategory(prismaCategory: CategoryEntity): ICategory;
};
export declare const categoryRepo: {
    manager: import("typeorm").EntityManager;
    findOne(findData: FindOneOptions<CategoryEntity>): Promise<ICategory>;
    findAll(findData: FindManyOptions<CategoryEntity>): Promise<ICategory[]>;
    createCategory(payload: ICreateCategoryInput): Promise<ICategory>;
    deleteCategory(category: ICategory): Promise<number>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<ICategory>>;
    updateCategory(store: ICategory, payload: Partial<CategoryEntity>): Promise<ICategory>;
    toDomainCategories(categories: CategoryEntity[]): ICategory[];
    toDomainCategory(prismaCategory: CategoryEntity): ICategory;
};
export interface ICategoryRepository {
    findOne(findData: FindOneOptions<CategoryEntity>): Promise<ICategory>;
    findAll(findData: FindManyOptions<CategoryEntity>): Promise<ICategory[]>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<ICategory>>;
    createCategory(payload: ICreateCategoryInput): Promise<ICategory>;
    updateCategory(store: ICategory, payload: Partial<CategoryEntity>): Promise<ICategory>;
    deleteCategory(category: ICategory): Promise<number>;
}
