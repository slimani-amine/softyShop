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
  async findOne(findData: FindOneOptions<StoreEntity>): Promise<IStore> {
    const store = await this.manager.findOne(StoreEntity, findData);
    return this.toDomainStore(store);
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
    const vendor = await this.manager.findOne(UserEntity, {
      where: { id: parseInt(payload.vendor_id, 10) },
    });

    if (!vendor) {
      exceptionService.notFoundException({
        message: "Vendor not found",
      });
    }

    const store = this.manager.create(StoreEntity, {
      storeName: payload.storeName,
      storePhone: payload.storePhone,
      logo: payload.logo,
      isPublished: payload.isPublished,
      location: JSON.stringify(payload.location),
      address: payload.address,
      socialMediaLinks: JSON.stringify(payload.socialMediaLinks),
      user: vendor,
    } as DeepPartial<StoreEntity>);

    const result = await this.manager.save(StoreEntity, store);
    return this.toDomainStore(result);
  },

  async updateStore(
    store: IStore,
    payload: Partial<StoreEntity>
  ): Promise<IStore> {
    await this.manager.update(
      StoreEntity,
      {
        id: store.getIdAsNumber(),
      },
      payload
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
    const result = await this.manager.update(
      StoreEntity,
      updatePayload.where,
      updatePayload.data
    );
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

  async findByQuery(queryParams: {
    [key: string]: string;
  }): Promise<QueryResult<IStore>> {
    console.log(queryParams);

    const result = await ApiFeatures.generateSqlQuery(
      dataSource,
      "stores",
      queryParams,
      {
        storeName: {
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
      storeName: prismaStore.storeName,
      storePhone: prismaStore.storePhone,
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
  findOne(findData: FindOneOptions<StoreEntity>): Promise<IStore>;
  findAll(findData: FindManyOptions<StoreEntity>): Promise<IStore[]>;
  findMyStores(findOptions: FindManyOptions<StoreEntity>): Promise<IStore[]>;
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
