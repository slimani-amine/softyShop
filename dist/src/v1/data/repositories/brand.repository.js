"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandRepo = exports.brandRepoBase = void 0;
const connection_1 = require("../connection");
const apiFeatures_util_1 = require("../../utils/querying/apiFeatures.util");
const product_entity_1 = require("../orm_models/product.entity");
const productBrand_entity_1 = require("../orm_models/productBrand.entity");
const brand_1 = require("../../domain/brand/brand");
const brandRepoBase = (dbConnection) => ({
    manager: dbConnection.manager,
    async findOne(findData) {
        const brand = await this.manager.findOne(productBrand_entity_1.BrandEntity, findData);
        return this.toDomainBrand(brand);
    },
    async findAll(findData) {
        const brands = await this.manager.find(productBrand_entity_1.BrandEntity, findData);
        return this.toDomainBrands(brands);
    },
    async createBrand(payload) {
        const product = await this.manager.findOne(product_entity_1.ProductEntity, {
            where: { id: payload.product_id },
        });
        if (!product) {
            throw new Error("Product not found");
        }
        const brand = this.manager.create(productBrand_entity_1.BrandEntity, {
            name: payload.name,
            logo: payload.logo,
            product: product,
        });
        const result = await this.manager.save(productBrand_entity_1.BrandEntity, brand);
        return this.toDomainBrand(result);
    },
    async getProductBrands(queryParams) {
        const { storeId, productId } = queryParams;
        const brands = await this.manager.find(productBrand_entity_1.BrandEntity, {
            where: {
                product: {
                    store: { id: storeId },
                    id: productId,
                },
            },
        });
        return brands;
    },
    async updateBrand(brand, payload) {
        await this.manager.update(productBrand_entity_1.BrandEntity, {
            id: brand.getIdAsNumber(),
        }, payload);
        const updatedBrand = await this.manager.findOne(productBrand_entity_1.BrandEntity, {
            where: {
                id: brand.getIdAsNumber().toString(),
            },
        });
        return this.toDomainBrand(updatedBrand);
    },
    async updateMany(updatePayload) {
        const result = await this.manager.update(productBrand_entity_1.BrandEntity, updatePayload.where, updatePayload.data);
        return result.affected;
    },
    async deleteBrand(brand) {
        const result = await this.manager.softDelete(productBrand_entity_1.BrandEntity, {
            id: brand.getIdAsNumber(),
        });
        return result !== null ? 1 : 0;
    },
    async deleteMany(payload) {
        const result = await this.manager.softDelete(productBrand_entity_1.BrandEntity, payload);
        return result.affected;
    },
    async findByQuery(queryParams) {
        const result = await apiFeatures_util_1.ApiFeatures.generateSqlQuery(connection_1.default, "brands", queryParams, {});
        return {
            docs: this.toDomainBrands(result.docs),
            meta: result.meta,
        };
    },
    toDomainBrands(brands) {
        const domainBrands = brands.map((prismaBrand) => this.toDomainBrand(prismaBrand));
        return domainBrands;
    },
    toDomainBrand(prismaBrand) {
        if (!prismaBrand) {
            return null;
        }
        const brand = new brand_1.Brand({
            id: prismaBrand.id.toString(),
            name: prismaBrand.name,
            logo: prismaBrand.logo,
        });
        return brand;
    },
});
exports.brandRepoBase = brandRepoBase;
exports.brandRepo = (0, exports.brandRepoBase)(connection_1.default);
//# sourceMappingURL=brand.repository.js.map