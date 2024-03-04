import {
  DataSource,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  QueryRunner,
} from "typeorm";
import {
  ProductEntity,
  ProductUpdateDataPayload,
} from "../orm_models/product.entity";
import {
  ICreateProductInput,
  IProduct,
  Product,
} from "../../domain/product/product";
import dataSource from "../connection";
import {
  ApiFeatures,
  QueryResult,
} from "../../utils/querying/apiFeatures.util";
import { BrandEntity } from "../orm_models/productBrand.entity";
import { ProductCreatorEntity } from "../orm_models/productCreator.entity";
import { CategoryEntity } from "../orm_models/category.entity";
import { StoreEntity } from "../orm_models/store.entity";

export const productRepoBase = (dbConnection: DataSource | QueryRunner) => ({
  manager: dbConnection.manager,

  async findOne(findData: FindOneOptions<ProductEntity>): Promise<IProduct> {
    const product = await this.manager.findOne(ProductEntity, findData);
    return this.toDomainProduct(product);
  },

  async findAll(findData: FindManyOptions<ProductEntity>): Promise<IProduct[]> {
    const products = await this.manager.find(ProductEntity, findData);
    return this.toDomainProducts(products);
  },

  async createProduct(payload: ICreateProductInput): Promise<IProduct> {
    const store = await this.manager.findOne(StoreEntity, {
      where: { id: payload.store_id },
    });

    if (!store) {
      throw new Error("store not found");
    }

    const brand = await this.manager.findOne(BrandEntity, {
      where: { id: payload.brand_id, store },
    });

    if (!brand) {
      throw new Error("brand not found");
    }

    const creator = await this.manager.findOne(ProductCreatorEntity, {
      where: { id: payload.creator_id, store },
    });

    if (!creator) {
      throw new Error("creator not found");
    }

    const category = await this.manager.findOne(CategoryEntity, {
      where: { id: payload.category_id },
    });

    if (!category) {
      throw new Error("category not found");
    }

    const product = this.manager.create(ProductEntity, {
      name: payload.name,
      price: payload.price,
      stockNumber: payload.stockNumber,
      publishedAt: payload.publishedAt,
      availability: payload.availability,
      isPublished: payload.isPublished,
      creator: creator,
      brand: brand,
      store: store,
      category: category,
      reviews: payload.reviewIds,
    } as DeepPartial<ProductEntity>);

    const result = await this.manager.save(ProductEntity, product);
    return this.toDomainProduct(result);
  },

  async updateProduct(
    product: IProduct,
    payload: Partial<ProductEntity>
  ): Promise<IProduct> {
    await this.manager.update(
      ProductEntity,
      { id: product.getIdAsNumber() },
      payload
    );
    const updatedProduct = await this.manager.findOne(ProductEntity, {
      where: { id: product.getIdAsNumber().toString() },
    });
    return this.toDomainProduct(updatedProduct);
  },

  async deleteProduct(product: IProduct): Promise<number> {
    const result = await this.manager.softDelete(ProductEntity, {
      id: product.getIdAsNumber(),
    });
    return result !== null ? 1 : 0;
  },

  async deleteMany(payload: Array<number>): Promise<number> {
    const result = await this.manager.softDelete(ProductEntity, payload);
    return result.affected;
  },

  async findByQuery(queryParams: {
    [key: string]: string;
  }): Promise<QueryResult<IProduct>> {
    const result = await ApiFeatures.generateSqlQuery(
      dataSource,
      "products",
      queryParams,
      {}
    );
    return {
      docs: this.toDomainProducts(result.docs),
      meta: result.meta,
    };
  },

  toDomainProducts(products: ProductEntity[]): IProduct[] {
    const domainProducts = products.map((prismaProduct) =>
      this.toDomainProduct(prismaProduct)
    );
    return domainProducts;
  },

  toDomainProduct(prismaProduct: ProductEntity): IProduct {
    if (!prismaProduct) {
      return null;
    }
    const product = new Product({
      id: prismaProduct.id,
      name: prismaProduct.name,
      price: prismaProduct.price,
      stockNumber: prismaProduct.stockNumber,
      publishedAt: prismaProduct.publishedAt,
      availability: prismaProduct.availability,
      isPublished: prismaProduct.isPublished,
      isAccepted: prismaProduct.isAccepted,
    });
    return product;
  },
});

export const productRepo = productRepoBase(dataSource);

export interface IProductRepository {
  findOne(findData: FindOneOptions<ProductEntity>): Promise<IProduct>;
  findAll(findData: FindManyOptions<ProductEntity>): Promise<IProduct[]>;
  findByQuery(queryParams: {
    [key: string]: string;
  }): Promise<QueryResult<IProduct>>;
  createProduct(payload: ICreateProductInput): Promise<IProduct>;
  updateProduct(
    product: IProduct,
    payload: Partial<ProductEntity>
  ): Promise<IProduct>;
  deleteProduct(product: IProduct): Promise<number>;
  deleteMany(payload: Array<number>): Promise<number>;
}
