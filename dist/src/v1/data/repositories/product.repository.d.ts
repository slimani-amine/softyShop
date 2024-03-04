import { DataSource, FindManyOptions, FindOneOptions, QueryRunner } from "typeorm";
import { ProductEntity } from "../orm_models/product.entity";
import { ICreateProductInput, IProduct } from "../../domain/product/product";
import { QueryResult } from "../../utils/querying/apiFeatures.util";
export declare const productRepoBase: (dbConnection: DataSource | QueryRunner) => {
    manager: import("typeorm").EntityManager;
    findOne(findData: FindOneOptions<ProductEntity>): Promise<IProduct>;
    findAll(findData: FindManyOptions<ProductEntity>): Promise<IProduct[]>;
    createProduct(payload: ICreateProductInput): Promise<IProduct>;
    updateProduct(product: IProduct, payload: Partial<ProductEntity>): Promise<IProduct>;
    deleteProduct(product: IProduct): Promise<number>;
    deleteMany(payload: Array<number>): Promise<number>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<IProduct>>;
    toDomainProducts(products: ProductEntity[]): IProduct[];
    toDomainProduct(prismaProduct: ProductEntity): IProduct;
};
export declare const productRepo: {
    manager: import("typeorm").EntityManager;
    findOne(findData: FindOneOptions<ProductEntity>): Promise<IProduct>;
    findAll(findData: FindManyOptions<ProductEntity>): Promise<IProduct[]>;
    createProduct(payload: ICreateProductInput): Promise<IProduct>;
    updateProduct(product: IProduct, payload: Partial<ProductEntity>): Promise<IProduct>;
    deleteProduct(product: IProduct): Promise<number>;
    deleteMany(payload: Array<number>): Promise<number>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<IProduct>>;
    toDomainProducts(products: ProductEntity[]): IProduct[];
    toDomainProduct(prismaProduct: ProductEntity): IProduct;
};
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
