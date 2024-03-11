"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeRepo = exports.storeRepoBase = void 0;
const store_entity_1 = require("../orm_models/store.entity");
const store_1 = require("../../domain/store/store");
const connection_1 = require("../connection");
const apiFeatures_util_1 = require("../../utils/querying/apiFeatures.util");
const user_entity_1 = require("../orm_models/user.entity");
const exceptions_1 = require("../../core/errors/exceptions");
const storeRepoBase = (dbConnection) => ({
  manager: dbConnection.manager,
  async findOne(findData) {
    const store = await this.manager.findOne(
      store_entity_1.StoreEntity,
      findData
    );
    return this.toDomainStore(store);
  },
  async findAll(findData) {
    const stores = await this.manager.find(
      store_entity_1.StoreEntity,
      findData
    );
    return this.toDomainStores(stores);
  },
  async findMyStores(findOptions) {
    const stores = await this.manager.find(
      store_entity_1.StoreEntity,
      findOptions
    );
    return this.toDomainStores(stores);
  },
  async createStore(payload) {
    const vendor = await this.manager.findOne(user_entity_1.UserEntity, {
      where: { id: parseInt(payload.vendor_id, 10) },
    });
    if (!vendor) {
      exceptions_1.exceptionService.notFoundException({
        message: "Vendor not found",
      });
    }
    const store = this.manager.create(store_entity_1.StoreEntity, {
      name: payload.name,
      phoneNumber: payload.phoneNumber,
      logo: payload.logo,
      isPublished: payload.isPublished,
      location: JSON.stringify(payload.location),
      address: payload.address,
      socialMediaLinks: JSON.stringify(payload.socialMediaLinks),
      user: vendor,
    });
    const result = await this.manager.save(store_entity_1.StoreEntity, store);
    return this.toDomainStore(result);
  },
  async updateStore(store, payload) {
    await this.manager.update(
      store_entity_1.StoreEntity,
      {
        id: store.getIdAsNumber(),
      },
      payload
    );
    const updatedStore = await this.manager.findOne(
      store_entity_1.StoreEntity,
      {
        where: {
          id: store.getIdAsNumber().toString(),
        },
      }
    );
    return this.toDomainStore(updatedStore);
  },
  async updateMany(updatePayload) {
    const result = await this.manager.update(
      store_entity_1.StoreEntity,
      updatePayload.where,
      updatePayload.data
    );
    return result.affected;
  },
  async deleteStore(store) {
    const result = await this.manager.softDelete(store_entity_1.StoreEntity, {
      id: store.getIdAsNumber(),
    });
    return result !== null ? 1 : 0;
  },
  async deleteMany(payload) {
    const result = await this.manager.softDelete(
      store_entity_1.StoreEntity,
      payload
    );
    return result.affected;
  },
  async findByQuery(queryParams) {
    console.log(queryParams);
    const result = await apiFeatures_util_1.ApiFeatures.generateSqlQuery(
      connection_1.default,
      "stores",
      queryParams,
      {
        name: {
          operator: "eq",
        },
      }
    );
    console.log("🚀 ~ storeRepoBase ~ result:", result);
    return {
      docs: this.toDomainStores(result.docs),
      meta: result.meta,
    };
  },
  toDomainStores(stores) {
    const domainStore = stores.map((prismaStore) =>
      this.toDomainStore(prismaStore)
    );
    return domainStore;
  },
  toDomainStore(prismaStore) {
    if (!prismaStore) {
      return null;
    }
    const store = new store_1.Store({
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
exports.storeRepoBase = storeRepoBase;
exports.storeRepo = (0, exports.storeRepoBase)(connection_1.default);
//# sourceMappingURL=store.repository.js.map
