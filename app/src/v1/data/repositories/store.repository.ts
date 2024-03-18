import {
  DataSource,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  QueryRunner,
} from "typeorm";
import {
  StoreEntity,
  StoresUpdateDataPayload,
} from "../orm_models/store.entity";
import { ICreateStoreInput, IStore, Store } from "../../domain/store/store";
import dataSource from "../connection";
import {
  ApiFeatures,
  QueryResult,
} from "../../utils/querying/apiFeatures.util";
import { UserEntity } from "../orm_models/user.entity";
import { exceptionService } from "../../core/errors/exceptions";

export const storeRepoBase = (dbConnection: DataSource | QueryRunner) => ({
  manager: dbConnection.manager,
  async findOne(findData: FindOneOptions<StoreEntity>): Promise<any> {
    const store = await this.manager.findOne(StoreEntity, findData);
    return store;
  },

  async findAll(findData: FindManyOptions<StoreEntity>): Promise<IStore[]> {
    const stores = await this.manager.find(StoreEntity, findData);
    return this.toDomainStores(stores);
  },

  async findMyStores(
    findOptions: FindManyOptions<StoreEntity>
  ): Promise<IStore[]> {
    const stores = await this.manager.find(StoreEntity, findOptions);
    return this.toDomainStores(stores);
  },

  async createStore(payload: ICreateStoreInput): Promise<IStore> {
    const store = this.manager.create(StoreEntity, {
      name: payload.name,
      phoneNumber: payload.phoneNumber,
      logo: payload.logo,
      isPublished: payload.isPublished,
      location: JSON.stringify(payload.location),
      address: payload.address,
      socialMediaLinks: JSON.stringify(payload.socialMediaLinks),
      user: { id: payload.vendor_id },
    } as DeepPartial<StoreEntity>);

    const result = await this.manager.save(StoreEntity, store);
    return this.toDomainStore(result);
  },

  async updateStore(store: IStore, payload: Partial<any>): Promise<IStore> {
    console.log("🚀 ~ storeRepoBase ~ payload:", payload);
    await this.manager.update(
      StoreEntity,
      {
        id: store.id,
      },
      payload
    );
    const updatedStore = await this.manager.findOne(StoreEntity, {
      where: {
        id: store.id,
      },
    });
    return this.toDomainStore(updatedStore);
  },

  async updateMany(updatePayload: {
    where: FindManyOptions<StoreEntity>;
    data: StoresUpdateDataPayload;
  }): Promise<number> {
    const result = await this.manager.update(
      StoreEntity,
      updatePayload.where,
      updatePayload.data
    );
    return result.affected;
  },

  async deleteStore(store: IStore): Promise<number> {
    const result = await this.manager.softDelete(StoreEntity, {
      id: store.id,
    });
    return result !== null ? 1 : 0;
  },

  async deleteMany(payload: Array<number>): Promise<number> {
    const result = await this.manager.softDelete(StoreEntity, payload);
    return result.affected;
  },

  async findByQuery(queryParams: {
    [key: string]: string;
  }): Promise<QueryResult<IStore>> {
    const result = await ApiFeatures.generateSqlQuery(
      dataSource,
      "stores",
      queryParams,
      {
        name: {
          operator: "like",
        },
        id: {
          operator: "eq",
        },
        location: {
          operator: "include",
        },
        address: {
          operator: "like",
        },
        vendor_id: {
          operator: "eq",
        },
        phoneNumber: {
          operator: "eq",
        },
      }
    );
    return {
      docs: this.toDomainStores(result.docs),
      meta: result.meta,
    };
  },

  toDomainStores(stores: StoreEntity[]): IStore[] {
    const domainStore = stores.map((prismaStore) =>
      this.toDomainStore(prismaStore)
    );
    return domainStore;
  },

  toDomainStore(prismaStore: StoreEntity): IStore {
    if (!prismaStore) {
      return null;
    }
    const store = new Store({
      id: prismaStore.id,
      name: prismaStore.name,
      phoneNumber: prismaStore.phoneNumber,
      logo: prismaStore.logo,
      isPublished: prismaStore.isPublished,
      location: prismaStore.location,
      address: prismaStore.address,
      socialMediaLinks: prismaStore.socialMediaLinks,
    });
    return store;
  },
});

export const storeRepo = storeRepoBase(dataSource);

export interface IStoreRepository {
  findOne(findData: FindOneOptions<StoreEntity>): Promise<any>;
  findAll(findData: FindManyOptions<StoreEntity>): Promise<IStore[]>;
  findMyStores(findOptions: FindManyOptions<StoreEntity>): Promise<IStore[]>;
  findByQuery(queryParams: {
    [key: string]: string;
  }): Promise<QueryResult<IStore>>;

  createStore(payload: ICreateStoreInput): Promise<IStore>;
  updateStore(store: IStore, payload: Partial<any>): Promise<IStore>;
  updateMany(updatePayload: {
    where: FindManyOptions<StoreEntity>;
    data: StoresUpdateDataPayload;
  }): Promise<number>;

  deleteStore(store: IStore): Promise<number>;
  deleteMany(payload: Array<number>): Promise<number>;
}
