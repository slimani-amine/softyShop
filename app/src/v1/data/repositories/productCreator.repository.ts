import {
  DataSource,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  QueryRunner,
} from "typeorm";

import dataSource from "../connection";
import {
  ApiFeatures,
  QueryResult,
} from "../../utils/querying/apiFeatures.util";
import {
  ProductCreatorEntity,
  ProductCreatorUpdateDataPayload,
} from "../orm_models/productCreator.entity";
import {
  ProductCreator,
  IProductCreator,
  ICreateProductCreatorInput,
} from "../../domain/productCreator/productCreator";
import { storeRepo } from "./store.repository";
import { exceptionService } from "../../core/errors/exceptions";

export const productCreatorRepoBase = (
  dbConnection: DataSource | QueryRunner
) => ({
  manager: dbConnection.manager,

  async findOne(
    findData: FindOneOptions<ProductCreatorEntity>
  ): Promise<IProductCreator> {
    const productCreator = await this.manager.findOne(
      ProductCreatorEntity,
      findData
    );
    return this.toDomainProductCreator(productCreator);
  },

  async findAll(
    findData: FindManyOptions<ProductCreatorEntity>
  ): Promise<IProductCreator[]> {
    const productCreators = await this.manager.find(
      ProductCreatorEntity,
      findData
    );
    return this.toDomainProductCreators(productCreators);
  },
  async getStoreProductCreators(queryParams: {
    storeId: string;
  }): Promise<ProductCreatorEntity[]> {
    const { storeId } = queryParams;

    const StoreProductCreators = await this.manager.find(ProductCreatorEntity, {
      where: {
        store: {
          id: storeId,
        },
      },
    });

    return StoreProductCreators;
  },
  async createProductCreator(
    payload: ICreateProductCreatorInput
  ): Promise<IProductCreator> {
    const store = await storeRepo.findOne({
      where: { id: payload.store_id },
    });

    if (!store) {
      exceptionService.badRequestException({
        message: "Store not found",
      });
    }

    const productCreator = this.manager.create(ProductCreatorEntity, {
      name: payload.name,
      store: store,
    } as DeepPartial<ProductCreatorEntity>);

    const result = await this.manager.save(
      ProductCreatorEntity,
      productCreator
    );
    return this.toDomainProductCreator(result);
  },

  async updateProductCreator(
    productCreator: IProductCreator,
    payload: Partial<ProductCreatorEntity>
  ): Promise<IProductCreator> {
    await this.manager.update(
      ProductCreatorEntity,
      {
        id: productCreator.getIdAsNumber(),
      },
      payload
    );
    const updatedProductCreator = await this.manager.findOne(
      ProductCreatorEntity,
      {
        where: {
          id: productCreator.getIdAsNumber().toString(),
        },
      }
    );
    return this.toDomainProductCreator(updatedProductCreator);
  },

  async updateMany(updatePayload: {
    where: FindManyOptions<ProductCreatorEntity>;
    data: ProductCreatorUpdateDataPayload;
  }): Promise<number> {
    const result = await this.manager.update(
      ProductCreatorEntity,
      updatePayload.where,
      updatePayload.data
    );
    return result.affected;
  },

  async deleteProductCreator(productCreator: IProductCreator): Promise<number> {
    const result = await this.manager.softDelete(ProductCreatorEntity, {
      id: productCreator.getIdAsNumber(),
    });
    return result !== null ? 1 : 0;
  },

  async deleteMany(payload: Array<number>): Promise<number> {
    const result = await this.manager.softDelete(ProductCreatorEntity, payload);
    return result.affected;
  },

  async findByQuery(queryParams: {
    [key: string]: string;
  }): Promise<QueryResult<IProductCreator>> {
    const result = await ApiFeatures.generateSqlQuery(
      dataSource,
      "productCreators",
      queryParams,
      {}
    );
    return {
      docs: this.toDomainProductCreators(result.docs),
      meta: result.meta,
    };
  },

  toDomainProductCreators(
    productCreators: ProductCreatorEntity[]
  ): IProductCreator[] {
    const domainProductCreators = productCreators.map((prismaProductCreator) =>
      this.toDomainProductCreator(prismaProductCreator)
    );
    return domainProductCreators;
  },

  toDomainProductCreator(
    prismaProductCreator: ProductCreatorEntity
  ): IProductCreator {
    if (!prismaProductCreator) {
      return null;
    }
    const productCreator = new ProductCreator({
      id: prismaProductCreator.id.toString(),
      name: prismaProductCreator.name,
    });
    return productCreator;
  },
});

export const productCreatorRepo = productCreatorRepoBase(dataSource);

export interface IProductCreatorRepository {
  findOne(
    findData: FindOneOptions<ProductCreatorEntity>
  ): Promise<IProductCreator>;
  findAll(
    findData: FindManyOptions<ProductCreatorEntity>
  ): Promise<IProductCreator[]>;
  findByQuery(queryParams: {
    [key: string]: string;
  }): Promise<QueryResult<IProductCreator>>;
  getStoreProductCreators(queryParams: {
    storeId: string;
  }): Promise<ProductCreatorEntity[]>;
  createProductCreator(
    payload: ICreateProductCreatorInput
  ): Promise<IProductCreator>;
  updateProductCreator(
    productCreator: IProductCreator,
    payload: Partial<ProductCreatorEntity>
  ): Promise<IProductCreator>;
  updateMany(updatePayload: {
    where: FindManyOptions<ProductCreatorEntity>;
    data: ProductCreatorUpdateDataPayload;
  }): Promise<number>;

  deleteProductCreator(productCreator: IProductCreator): Promise<number>;
  deleteMany(payload: Array<number>): Promise<number>;
}
