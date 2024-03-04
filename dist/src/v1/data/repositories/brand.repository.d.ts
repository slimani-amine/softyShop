import { DataSource, FindManyOptions, FindOneOptions, QueryRunner } from "typeorm";
import { QueryResult } from "../../utils/querying/apiFeatures.util";
import { BrandEntity, BrandUpdateDataPayload } from "../orm_models/productBrand.entity";
import { IBrand, ICreateBrandInput } from "../../domain/brand/brand";
export declare const brandRepoBase: (dbConnection: DataSource | QueryRunner) => {
    manager: import("typeorm").EntityManager;
    findOne(findData: FindOneOptions<BrandEntity>): Promise<IBrand>;
    findAll(findData: FindManyOptions<BrandEntity>): Promise<IBrand[]>;
    createBrand(payload: ICreateBrandInput): Promise<IBrand>;
    getStoreBrands(queryParams: {
        storeId: string;
    }): Promise<BrandEntity[]>;
    updateBrand(brand: IBrand, payload: Partial<BrandEntity>): Promise<IBrand>;
    updateMany(updatePayload: {
        where: FindManyOptions<BrandEntity>;
        data: BrandUpdateDataPayload;
    }): Promise<number>;
    deleteBrand(brand: IBrand): Promise<number>;
    deleteMany(payload: Array<number>): Promise<number>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<IBrand>>;
    toDomainBrands(brands: BrandEntity[]): IBrand[];
    toDomainBrand(prismaBrand: BrandEntity): IBrand;
};
export declare const brandRepo: {
    manager: import("typeorm").EntityManager;
    findOne(findData: FindOneOptions<BrandEntity>): Promise<IBrand>;
    findAll(findData: FindManyOptions<BrandEntity>): Promise<IBrand[]>;
    createBrand(payload: ICreateBrandInput): Promise<IBrand>;
    getStoreBrands(queryParams: {
        storeId: string;
    }): Promise<BrandEntity[]>;
    updateBrand(brand: IBrand, payload: Partial<BrandEntity>): Promise<IBrand>;
    updateMany(updatePayload: {
        where: FindManyOptions<BrandEntity>;
        data: BrandUpdateDataPayload;
    }): Promise<number>;
    deleteBrand(brand: IBrand): Promise<number>;
    deleteMany(payload: Array<number>): Promise<number>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<IBrand>>;
    toDomainBrands(brands: BrandEntity[]): IBrand[];
    toDomainBrand(prismaBrand: BrandEntity): IBrand;
};
export interface IBrandRepository {
    findOne(findData: FindOneOptions<BrandEntity>): Promise<IBrand>;
    findAll(findData: FindManyOptions<BrandEntity>): Promise<IBrand[]>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<IBrand>>;
    getStoreBrands(queryParams: {
        storeId: string;
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
