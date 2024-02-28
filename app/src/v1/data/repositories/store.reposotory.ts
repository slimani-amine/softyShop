import { DataSource, DeepPartial, FindManyOptions, FindOneOptions, QueryRunner } from 'typeorm';
import { StoreEntity, StoresUpdateDataPayload } from '../orm_models/store.entity';
import { ICreateStoreInput, IStore, Store } from '../../domain/store/store';
import dataSource from '../connection';
import { ApiFeatures, QueryResult } from '../../utils/querying/apiFeatures.util';

export const storeRepoBase = (dbConnection: DataSource | QueryRunner) => ({
  manager: dbConnection.manager,
  async findOne(findData: FindOneOptions<StoreEntity>): Promise<IStore> {
    console.log('🚀 ~ findOne ~ findData:', findData);
    const store = await this.manager.findOne(StoreEntity, findData);
    return this.toDomainStore(store);
  },

  async findAll(findData: FindManyOptions<StoreEntity>): Promise<IStore[]> {
    console.log('🚀 ~ findAll ~ findData:', findData);
    const stores = await this.manager.find(StoreEntity, findData);
    return this.toDomainStores(stores);
  },

  async createStore(payload: ICreateStoreInput): Promise<IStore> {
    const store = this.manager.create(StoreEntity, {
      storeName: payload.storeName,
      logo: payload.logo,
      foundedAt: payload.foundedAt,
      isPublished: payload.isPublished,
      position: payload.position,
      socialMediaLinks: payload.socialMediaLinks,
      vendor_id: payload.vendor_id,
    } as DeepPartial<StoreEntity>);

    const result = await this.manager.save(StoreEntity, store);
    return this.toDomainStore(result);
  },

  async updateStore(store: IStore, payload: Partial<StoreEntity>): Promise<IStore> {
    await this.manager.update(
      StoreEntity,
      {
        id: store.getIdAsNumber(),
      },
      payload,
    );
    const updatedStore = await this.manager.findOne(StoreEntity, {
      where: {
        id: store.getIdAsNumber().toString(),
      },
    });
    return this.toDomainStore(updatedStore);
  },

  async updateMany(updatePayload: {
    where: FindManyOptions<StoreEntity>;
    data: StoresUpdateDataPayload;
  }): Promise<number> {
    const result = await this.manager.update(StoreEntity, updatePayload.where, updatePayload.data);
    return result.affected;
  },

  async deleteStore(store: IStore): Promise<number> {
    const result = await this.manager.softDelete(StoreEntity, {
      id: store.getIdAsNumber(),
    });
    return result !== null ? 1 : 0;
  },

  async deleteMany(payload: Array<number>): Promise<number> {
    const result = await this.manager.softDelete(StoreEntity, payload);
    return result.affected;
  },

  async findByQuery(queryParams: { [key: string]: string }): Promise<QueryResult<IStore>> {
    const result = await ApiFeatures.generateSqlQuery(dataSource, 'stores', queryParams, {});
    return {
      docs: this.toDomainStores(result.docs),
      meta: result.meta,
    };
  },

  toDomainStores(stores: StoreEntity[]): IStore[] {
    const domainStore = stores.map((prismaStore) => this.toDomainStore(prismaStore));
    return domainStore;
  },

  toDomainStore(prismaStore: StoreEntity): IStore {
    if (!prismaStore) {
      return null;
    }
    const store = new Store({
      id: prismaStore.id,
      storeName: prismaStore.storeName,
      storePhone: prismaStore.storePhone,
      logo: prismaStore.logo,
      foundedAt: prismaStore.foundedAt,
      isPublished: prismaStore.isPublished,
      position: prismaStore.position,
      socialMediaLinks: prismaStore.socialMediaLinks,
    });
    return store;
  },
});

export const storeRepo = storeRepoBase(dataSource);

export interface IStoreRepository {
  findOne(findData: FindOneOptions<StoreEntity>): Promise<IStore>;
  findAll(findData: FindManyOptions<StoreEntity>): Promise<IStore[]>;
  findByQuery(queryParams: { [key: string]: string }): Promise<QueryResult<IStore>>;
  createStore(payload: ICreateStoreInput): Promise<IStore>;
  updateStore(store: IStore, payload: Partial<StoreEntity>): Promise<IStore>;
  updateMany(updatePayload: {
    where: FindManyOptions<StoreEntity>;
    data: StoresUpdateDataPayload;
  }): Promise<number>;
  deleteStore(store: IStore): Promise<number>;
  deleteMany(payload: Array<number>): Promise<number>;
}
