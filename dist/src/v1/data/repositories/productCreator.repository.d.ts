import { DataSource, FindManyOptions, FindOneOptions, QueryRunner } from "typeorm";
import { QueryResult } from "../../utils/querying/apiFeatures.util";
import { ProductCreatorEntity, ProductCreatorUpdateDataPayload } from "../orm_models/productCreator.entity";
import { IProductCreator, ICreateProductCreatorInput } from "../../domain/productCreator/productCreator";
export declare const productCreatorRepoBase: (dbConnection: DataSource | QueryRunner) => {
    manager: import("typeorm").EntityManager;
    findOne(findData: FindOneOptions<ProductCreatorEntity>): Promise<IProductCreator>;
    findAll(findData: FindManyOptions<ProductCreatorEntity>): Promise<IProductCreator[]>;
    getStoreProductCreators(queryParams: {
        storeId: string;
    }): Promise<ProductCreatorEntity[]>;
    createProductCreator(payload: ICreateProductCreatorInput): Promise<IProductCreator>;
    updateProductCreator(productCreator: IProductCreator, payload: Partial<ProductCreatorEntity>): Promise<IProductCreator>;
    updateMany(updatePayload: {
        where: FindManyOptions<ProductCreatorEntity>;
        data: ProductCreatorUpdateDataPayload;
    }): Promise<number>;
    deleteProductCreator(productCreator: IProductCreator): Promise<number>;
    deleteMany(payload: Array<number>): Promise<number>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<IProductCreator>>;
    toDomainProductCreators(productCreators: ProductCreatorEntity[]): IProductCreator[];
    toDomainProductCreator(prismaProductCreator: ProductCreatorEntity): IProductCreator;
};
export declare const productCreatorRepo: {
    manager: import("typeorm").EntityManager;
    findOne(findData: FindOneOptions<ProductCreatorEntity>): Promise<IProductCreator>;
    findAll(findData: FindManyOptions<ProductCreatorEntity>): Promise<IProductCreator[]>;
    getStoreProductCreators(queryParams: {
        storeId: string;
    }): Promise<ProductCreatorEntity[]>;
    createProductCreator(payload: ICreateProductCreatorInput): Promise<IProductCreator>;
    updateProductCreator(productCreator: IProductCreator, payload: Partial<ProductCreatorEntity>): Promise<IProductCreator>;
    updateMany(updatePayload: {
        where: FindManyOptions<ProductCreatorEntity>;
        data: ProductCreatorUpdateDataPayload;
    }): Promise<number>;
    deleteProductCreator(productCreator: IProductCreator): Promise<number>;
    deleteMany(payload: Array<number>): Promise<number>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<IProductCreator>>;
    toDomainProductCreators(productCreators: ProductCreatorEntity[]): IProductCreator[];
    toDomainProductCreator(prismaProductCreator: ProductCreatorEntity): IProductCreator;
};
export interface IProductCreatorRepository {
    findOne(findData: FindOneOptions<ProductCreatorEntity>): Promise<IProductCreator>;
    findAll(findData: FindManyOptions<ProductCreatorEntity>): Promise<IProductCreator[]>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<IProductCreator>>;
    getStoreProductCreators(queryParams: {
        storeId: string;
    }): Promise<ProductCreatorEntity[]>;
    createProductCreator(payload: ICreateProductCreatorInput): Promise<IProductCreator>;
    updateProductCreator(productCreator: IProductCreator, payload: Partial<ProductCreatorEntity>): Promise<IProductCreator>;
    updateMany(updatePayload: {
        where: FindManyOptions<ProductCreatorEntity>;
        data: ProductCreatorUpdateDataPayload;
    }): Promise<number>;
    deleteProductCreator(productCreator: IProductCreator): Promise<number>;
    deleteMany(payload: Array<number>): Promise<number>;
}
