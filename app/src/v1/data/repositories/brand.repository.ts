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
import { ProductEntity } from "../orm_models/product.entity";
import {
  BrandEntity,
  BrandUpdateDataPayload,
} from "../orm_models/productBrand.entity";
import { Brand, IBrand, ICreateBrandInput } from "../../domain/brand/brand";

export const brandRepoBase = (dbConnection: DataSource | QueryRunner) => ({
  manager: dbConnection.manager,

  async findOne(findData: FindOneOptions<BrandEntity>): Promise<IBrand> {
    const brand = await this.manager.findOne(BrandEntity, findData);
    return this.toDomainBrand(brand);
  },

  async findAll(findData: FindManyOptions<BrandEntity>): Promise<IBrand[]> {
    const brands = await this.manager.find(BrandEntity, findData);
    return this.toDomainBrands(brands);
  },

  async createBrand(payload: ICreateBrandInput): Promise<IBrand> {
    const product = await this.manager.findOne(ProductEntity, {
      where: { id: payload.product_id },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const brand = this.manager.create(BrandEntity, {
      name: payload.name,
      logo: payload.logo,
      product: product,
    } as DeepPartial<BrandEntity>);

    const result = await this.manager.save(BrandEntity, brand);
    return this.toDomainBrand(result);
  },
  async getProductBrands(queryParams: {
    storeId: string;
    productId: string;
  }): Promise<BrandEntity[]> {
    const { storeId, productId } = queryParams;

    const brands = await this.manager.find(BrandEntity, {
      where: {
        product: {
          store: { id: storeId },
          id: productId,
        },
      },
    });

    return brands;
  },

  async updateBrand(
    brand: IBrand,
    payload: Partial<BrandEntity>
  ): Promise<IBrand> {
    await this.manager.update(
      BrandEntity,
      {
        id: brand.getIdAsNumber(),
      },
      payload
    );
    const updatedBrand = await this.manager.findOne(BrandEntity, {
      where: {
        id: brand.getIdAsNumber().toString(),
      },
    });
    return this.toDomainBrand(updatedBrand);
  },

  async updateMany(updatePayload: {
    where: FindManyOptions<BrandEntity>;
    data: BrandUpdateDataPayload;
  }): Promise<number> {
    const result = await this.manager.update(
      BrandEntity,
      updatePayload.where,
      updatePayload.data
    );
    return result.affected;
  },

  async deleteBrand(brand: IBrand): Promise<number> {
    const result = await this.manager.softDelete(BrandEntity, {
      id: brand.getIdAsNumber(),
    });
    return result !== null ? 1 : 0;
  },

  async deleteMany(payload: Array<number>): Promise<number> {
    const result = await this.manager.softDelete(BrandEntity, payload);
    return result.affected;
  },

  async findByQuery(queryParams: {
    [key: string]: string;
  }): Promise<QueryResult<IBrand>> {
    const result = await ApiFeatures.generateSqlQuery(
      dataSource,
      "brands",
      queryParams,
      {}
    );
    return {
      docs: this.toDomainBrands(result.docs),
      meta: result.meta,
    };
  },

  toDomainBrands(brands: BrandEntity[]): IBrand[] {
    const domainBrands = brands.map((prismaBrand) =>
      this.toDomainBrand(prismaBrand)
    );
    return domainBrands;
  },

  toDomainBrand(prismaBrand: BrandEntity): IBrand {
    if (!prismaBrand) {
      return null;
    }
    const brand = new Brand({
      id: prismaBrand.id.toString(),
      name: prismaBrand.name,
      logo: prismaBrand.logo,
    });
    return brand;
  },
});

export const brandRepo = brandRepoBase(dataSource);

export interface IBrandRepository {
  findOne(findData: FindOneOptions<BrandEntity>): Promise<IBrand>;
  findAll(findData: FindManyOptions<BrandEntity>): Promise<IBrand[]>;
  findByQuery(queryParams: {
    [key: string]: string;
  }): Promise<QueryResult<IBrand>>;
  getProductBrands(queryParams: {
    storeId: string;
    productId: string;
  }): Promise<BrandEntity[]>;

  createBrand(payload: ICreateBrandInput): Promise<IBrand>;
  updateBrand(brand: IBrand, payload: Partial<BrandEntity>): Promise<IBrand>;
  updateMany(updatePayload: {
    where: FindManyOptions<BrandEntity>;
    data: BrandUpdateDataPayload;
  }): Promise<number>;

  deleteBrand(brand: IBrand): Promise<number>;
  deleteMany(payload: Array<number>): Promise<number>;
}
