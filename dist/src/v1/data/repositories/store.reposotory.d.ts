import { DataSource, FindManyOptions, FindOneOptions, QueryRunner } from 'typeorm';
import { StoreEntity, StoresUpdateDataPayload } from '../orm_models/store.entity';
import { ICreateStoreInput, IStore } from '../../domain/store/store';
import { QueryResult } from '../../utils/querying/apiFeatures.util';
export declare const storeRepoBase: (dbConnection: DataSource | QueryRunner) => {
    manager: import("typeorm").EntityManager;
    findOne(findData: FindOneOptions<StoreEntity>): Promise<IStore>;
    findAll(findData: FindManyOptions<StoreEntity>): Promise<IStore[]>;
    createStore(payload: ICreateStoreInput): Promise<IStore>;
    updateStore(store: IStore, payload: Partial<StoreEntity>): Promise<IStore>;
    updateMany(updatePayload: {
        where: FindManyOptions<StoreEntity>;
        data: StoresUpdateDataPayload;
    }): Promise<number>;
    deleteStore(store: IStore): Promise<number>;
    deleteMany(payload: Array<number>): Promise<number>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<IStore>>;
    toDomainStores(stores: StoreEntity[]): IStore[];
    toDomainStore(prismaStore: StoreEntity): IStore;
};
export declare const storeRepo: {
    manager: import("typeorm").EntityManager;
    findOne(findData: FindOneOptions<StoreEntity>): Promise<IStore>;
    findAll(findData: FindManyOptions<StoreEntity>): Promise<IStore[]>;
    createStore(payload: ICreateStoreInput): Promise<IStore>;
    updateStore(store: IStore, payload: Partial<StoreEntity>): Promise<IStore>;
    updateMany(updatePayload: {
        where: FindManyOptions<StoreEntity>;
        data: StoresUpdateDataPayload;
    }): Promise<number>;
    deleteStore(store: IStore): Promise<number>;
    deleteMany(payload: Array<number>): Promise<number>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<IStore>>;
    toDomainStores(stores: StoreEntity[]): IStore[];
    toDomainStore(prismaStore: StoreEntity): IStore;
};
export interface IStoreRepository {
    findOne(findData: FindOneOptions<StoreEntity>): Promise<IStore>;
    findAll(findData: FindManyOptions<StoreEntity>): Promise<IStore[]>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<IStore>>;
    createStore(payload: ICreateStoreInput): Promise<IStore>;
    updateStore(store: IStore, payload: Partial<StoreEntity>): Promise<IStore>;
    updateMany(updatePayload: {
        where: FindManyOptions<StoreEntity>;
        data: StoresUpdateDataPayload;
    }): Promise<number>;
    deleteStore(store: IStore): Promise<number>;
    deleteMany(payload: Array<number>): Promise<number>;
}
