"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRepo = exports.productRepoBase = void 0;
const product_entity_1 = require("../orm_models/product.entity");
const product_1 = require("../../domain/product/product");
const connection_1 = require("../connection");
const apiFeatures_util_1 = require("../../utils/querying/apiFeatures.util");
const productBrand_entity_1 = require("../orm_models/productBrand.entity");
const productCreator_entity_1 = require("../orm_models/productCreator.entity");
const category_entity_1 = require("../orm_models/category.entity");
const store_entity_1 = require("../orm_models/store.entity");
const productRepoBase = (dbConnection) => ({
    manager: dbConnection.manager,
    async findOne(findData) {
        const product = await this.manager.findOne(product_entity_1.ProductEntity, findData);
        return this.toDomainProduct(product);
    },
    async findAll(findData) {
        const products = await this.manager.find(product_entity_1.ProductEntity, findData);
        return this.toDomainProducts(products);
    },
    async createProduct(payload) {
        const store = await this.manager.findOne(store_entity_1.StoreEntity, {
            where: { id: payload.store_id },
        });
        if (!store) {
            throw new Error("store not found");
        }
        const brand = await this.manager.findOne(productBrand_entity_1.BrandEntity, {
            where: { id: payload.brand_id },
        });
        console.log("🚀 ~ createProduct ~ brand:", brand);
        if (!brand) {
            throw new Error("brand not found");
        }
        const creator = await this.manager.findOne(productCreator_entity_1.ProductCreatorEntity, {
            where: { id: payload.creator_id },
        });
        if (!creator) {
            throw new Error("creator not found");
        }
        const category = await this.manager.findOne(category_entity_1.CategoryEntity, {
            where: { id: payload.category_id },
        });
        if (!category) {
            throw new Error("category not found");
        }
        const product = this.manager.create(product_entity_1.ProductEntity, {
            name: payload.name,
            price: payload.price,
            stockNumber: payload.stockNumber,
            publishedAt: payload.publishedAt,
            availability: payload.availability,
            isPublished: payload.isPublished,
            creator: creator,
            brand: brand,
            store: store,
            category: category,
            reviews: payload.reviewIds,
        });
        const result = await this.manager.save(product_entity_1.ProductEntity, product);
        return this.toDomainProduct(result);
    },
    async updateProduct(product, payload) {
        await this.manager.update(product_entity_1.ProductEntity, { id: product.getIdAsNumber() }, payload);
        const updatedProduct = await this.manager.findOne(product_entity_1.ProductEntity, {
            where: { id: product.getIdAsNumber().toString() },
        });
        return this.toDomainProduct(updatedProduct);
    },
    async deleteProduct(product) {
        const result = await this.manager.softDelete(product_entity_1.ProductEntity, {
            id: product.getIdAsNumber(),
        });
        return result !== null ? 1 : 0;
    },
    async deleteMany(payload) {
        const result = await this.manager.softDelete(product_entity_1.ProductEntity, payload);
        return result.affected;
    },
    async findByQuery(queryParams) {
        const result = await apiFeatures_util_1.ApiFeatures.generateSqlQuery(connection_1.default, "products", queryParams, {
            id: {
                operator: "eq",
            },
            name: {
                operator: "like",
            },
        });
        return {
            docs: this.toDomainProducts(result.docs),
            meta: result.meta,
        };
    },
    toDomainProducts(products) {
        const domainProducts = products.map((prismaProduct) => this.toDomainProduct(prismaProduct));
        return domainProducts;
    },
    toDomainProduct(prismaProduct) {
        if (!prismaProduct) {
            return null;
        }
        const product = new product_1.Product({
            id: prismaProduct.id,
            name: prismaProduct.name,
            price: prismaProduct.price,
            stockNumber: prismaProduct.stockNumber,
            publishedAt: prismaProduct.publishedAt,
            availability: prismaProduct.availability,
            isPublished: prismaProduct.isPublished,
            isAccepted: prismaProduct.isAccepted,
        });
        return product;
    },
});
exports.productRepoBase = productRepoBase;
exports.productRepo = (0, exports.productRepoBase)(connection_1.default);
//# sourceMappingURL=product.repository.js.map