import {
  DataSource,
  QueryRunner,
  FindOneOptions,
  FindManyOptions,
  DeepPartial,
} from "typeorm";
import {
  ApiFeatures,
  QueryResult,
} from "../../utils/querying/apiFeatures.util";
import {
  CategoryEntity,
} from "../orm_models/category.entity";
import dataSource from "../connection";
import {
  Category,
  ICategory,
  ICreateCategoryInput,
} from "../../domain/category/category";

export const categoryRepoBase = (dbConnection: DataSource | QueryRunner) => ({
  manager: dbConnection.manager,

  async findOne(findData: FindOneOptions<CategoryEntity>): Promise<ICategory> {
    const category = await this.manager.findOne(CategoryEntity, findData);
    return this.toDomainCategory(category);
  },

  async findAll(
    findData: FindManyOptions<CategoryEntity>
  ): Promise<ICategory[]> {
    const categories = await this.manager.find(CategoryEntity, findData);
    return this.toDomainCategories(categories);
  },

  async createCategory(payload: ICreateCategoryInput): Promise<ICategory> {
    const category = this.manager.create(CategoryEntity, {
      name: payload.name,
      icon: payload.icon,
    } as DeepPartial<CategoryEntity>);

    const result = await this.manager.save(CategoryEntity, category);
    return this.toDomainCategory(result);
  },

  async deleteCategory(category: ICategory): Promise<number> {
    const result = await this.manager.softDelete(CategoryEntity, category.id);
    return result !== null ? 1 : 0;
  },

  async findByQuery(queryParams: {
    [key: string]: string;
  }): Promise<QueryResult<ICategory>> {
    const result = await ApiFeatures.generateSqlQuery(
      dataSource,
      "category",
      queryParams,
      {}
    );
    return {
      docs: this.toDomainCategories(result.docs),
      meta: result.meta,
    };
  },
  
  async updateCategory(
    store: ICategory,
    payload: Partial<CategoryEntity>
  ): Promise<ICategory> {
    await this.manager.update(
      CategoryEntity,
      {
        id: store.getIdAsNumber(),
      },
      payload
    );
    const updatedStore = await this.manager.findOne(CategoryEntity, {
      where: {
        id: store.getIdAsNumber().toString(),
      },
    });
    return this.toDomainCategory(updatedStore);
  },

  toDomainCategories(categories: CategoryEntity[]): ICategory[] {
    const domainCategory = categories.map((prismaCategory) =>
      this.toDomainCategory(prismaCategory)
    );
    return domainCategory;
  },

  toDomainCategory(prismaCategory: CategoryEntity): ICategory {
    if (!prismaCategory) {
      return null;
    }
    const category = new Category({
      id: prismaCategory.id,
      name: prismaCategory.name,
      icon: prismaCategory.icon,
    });
    return category;
  },
});

export const categoryRepo = categoryRepoBase(dataSource);

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
