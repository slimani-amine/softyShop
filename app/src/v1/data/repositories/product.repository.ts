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
  JoinInfo,
  QueryResult,
} from "../../utils/querying/apiFeatures.util";
import { BrandEntity } from "../orm_models/productBrand.entity";
import { ProductCreatorEntity } from "../orm_models/productCreator.entity";
import { CategoryEntity } from "../orm_models/category.entity";
import { StoreEntity } from "../orm_models/store.entity";
import { exceptionService } from "../../core/errors/exceptions";

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
      exceptionService.notFoundException({
        message: "store not found",
      });
    }

    const brand = await this.manager.findOne(BrandEntity, {
      where: { id: payload.brand_id },
    });

    if (!brand) {
      exceptionService.notFoundException({
        message: "brand not found",
      });
    }

    const creator = await this.manager.findOne(ProductCreatorEntity, {
      where: { id: payload.creator_id },
    });

    if (!creator) {
      exceptionService.notFoundException({
        message: "creator not found",
      });
    }

    const category = await this.manager.findOne(CategoryEntity, {
      where: { id: payload.category_id },
    });

    if (!category) {
      exceptionService.notFoundException({
        message: "category not found",
      });
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
      images: JSON.stringify(payload.images),
      discount: payload.discount,
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
    const joinInfo: Record<string, JoinInfo> = {
      reviews: {
        selectedFields: ["id", "content", "rating", "productId"],
        joinType: "LEFT JOIN", // Adjust join type as needed
        conditionField: "product_id",
        foreignTable: "products",
        foreignConditionField: "id",
        asTableAlias: true, // Optionally, alias the reviews table
      },
    };
    const result = await ApiFeatures.generateSqlQuery(
      dataSource,
      "products",
      queryParams,
      {
        id: {
          operator: "eq",
        },
        name: {
          operator: "like",
        },
        isPublished: {
          operator: "eq",
        },
        availability: {
          operator: "eq",
        },
        stockNumber: {
          operator: "gte",
        },
        // "reviews": {
        //   operator: "injoin",
        //   joinTables: {
        //     Reviews: {
        //       tableAlias: "product_id",
        //       selectedFields: ["rating"],
        //     },
        //   },
        // },
        // "wishlist.id": {
        //   operator: "injoin",
        //   joinTables: {
        //     Reviews: {
        //       selectedFields: ["id"],
        //     },
        //   },
        // },
      }
    );

    return {
      docs: result.docs,
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
      category: prismaProduct.category,
      images: prismaProduct.images,
      discount: prismaProduct.discount,
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
  updateProduct(product: IProduct, payload: any): Promise<IProduct>;
  deleteProduct(product: IProduct): Promise<number>;
  deleteMany(payload: Array<number>): Promise<number>;
}
