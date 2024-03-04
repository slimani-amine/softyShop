"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productCreatorRepo = exports.productCreatorRepoBase = void 0;
const connection_1 = require("../connection");
const apiFeatures_util_1 = require("../../utils/querying/apiFeatures.util");
const productCreator_entity_1 = require("../orm_models/productCreator.entity");
const productCreator_1 = require("../../domain/productCreator/productCreator");
const store_repository_1 = require("./store.repository");
const exceptions_1 = require("../../core/errors/exceptions");
const productCreatorRepoBase = (dbConnection) => ({
    manager: dbConnection.manager,
    async findOne(findData) {
        const productCreator = await this.manager.findOne(productCreator_entity_1.ProductCreatorEntity, findData);
        return this.toDomainProductCreator(productCreator);
    },
    async findAll(findData) {
        const productCreators = await this.manager.find(productCreator_entity_1.ProductCreatorEntity, findData);
        return this.toDomainProductCreators(productCreators);
    },
    async getStoreProductCreators(queryParams) {
        const { storeId } = queryParams;
        const StoreProductCreators = await this.manager.find(productCreator_entity_1.ProductCreatorEntity, {
            where: {
                store: {
                    id: storeId,
                },
            },
        });
        return StoreProductCreators;
    },
    async createProductCreator(payload) {
        const store = await store_repository_1.storeRepo.findOne({
            where: { id: payload.store_id },
        });
        if (!store) {
            exceptions_1.exceptionService.badRequestException({
                message: "Store not found",
            });
        }
        const productCreator = this.manager.create(productCreator_entity_1.ProductCreatorEntity, {
            name: payload.name,
            store: store,
        });
        const result = await this.manager.save(productCreator_entity_1.ProductCreatorEntity, productCreator);
        return this.toDomainProductCreator(result);
    },
    async updateProductCreator(productCreator, payload) {
        await this.manager.update(productCreator_entity_1.ProductCreatorEntity, {
            id: productCreator.getIdAsNumber(),
        }, payload);
        const updatedProductCreator = await this.manager.findOne(productCreator_entity_1.ProductCreatorEntity, {
            where: {
                id: productCreator.getIdAsNumber().toString(),
            },
        });
        return this.toDomainProductCreator(updatedProductCreator);
    },
    async updateMany(updatePayload) {
        const result = await this.manager.update(productCreator_entity_1.ProductCreatorEntity, updatePayload.where, updatePayload.data);
        return result.affected;
    },
    async deleteProductCreator(productCreator) {
        const result = await this.manager.softDelete(productCreator_entity_1.ProductCreatorEntity, {
            id: productCreator.getIdAsNumber(),
        });
        return result !== null ? 1 : 0;
    },
    async deleteMany(payload) {
        const result = await this.manager.softDelete(productCreator_entity_1.ProductCreatorEntity, payload);
        return result.affected;
    },
    async findByQuery(queryParams) {
        const result = await apiFeatures_util_1.ApiFeatures.generateSqlQuery(connection_1.default, "productCreators", queryParams, {});
        return {
            docs: this.toDomainProductCreators(result.docs),
            meta: result.meta,
        };
    },
    toDomainProductCreators(productCreators) {
        const domainProductCreators = productCreators.map((prismaProductCreator) => this.toDomainProductCreator(prismaProductCreator));
        return domainProductCreators;
    },
    toDomainProductCreator(prismaProductCreator) {
        if (!prismaProductCreator) {
            return null;
        }
        const productCreator = new productCreator_1.ProductCreator({
            id: prismaProductCreator.id.toString(),
            name: prismaProductCreator.name,
        });
        return productCreator;
    },
});
exports.productCreatorRepoBase = productCreatorRepoBase;
exports.productCreatorRepo = (0, exports.productCreatorRepoBase)(connection_1.default);
//# sourceMappingURL=productCreator.repository.js.map