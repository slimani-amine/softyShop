"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRepo = exports.categoryRepoBase = void 0;
const apiFeatures_util_1 = require("../../utils/querying/apiFeatures.util");
const category_entity_1 = require("../orm_models/category.entity");
const connection_1 = require("../connection");
const category_1 = require("../../domain/category/category");
const categoryRepoBase = (dbConnection) => ({
    manager: dbConnection.manager,
    async findOne(findData) {
        const category = await this.manager.findOne(category_entity_1.CategoryEntity, findData);
        return this.toDomainCategory(category);
    },
    async findAll(findData) {
        const categories = await this.manager.find(category_entity_1.CategoryEntity, findData);
        return this.toDomainCategories(categories);
    },
    async createCategory(payload) {
        const category = this.manager.create(category_entity_1.CategoryEntity, {
            name: payload.name,
            icon: payload.icon,
            isPublished: payload.isPublished,
        });
        const result = await this.manager.save(category_entity_1.CategoryEntity, category);
        return this.toDomainCategory(result);
    },
    async deleteCategory(category) {
        const result = await this.manager.softDelete(category_entity_1.CategoryEntity, category.id);
        return result !== null ? 1 : 0;
    },
    async findByQuery(queryParams) {
        const result = await apiFeatures_util_1.ApiFeatures.generateSqlQuery(connection_1.default, "category", queryParams, {
            id: {
                operator: "eq",
            },
            name: {
                operator: "like",
            },
            isPublished: {
                operator: "eq",
            },
        });
        return {
            docs: this.toDomainCategories(result.docs),
            meta: result.meta,
        };
    },
    async updateCategory(store, payload) {
        console.log("🚀 ~ categoryRepoBase ~ payload:", payload);
        await this.manager.update(category_entity_1.CategoryEntity, {
            id: store.getIdAsNumber(),
        }, payload);
        const updatedStore = await this.manager.findOne(category_entity_1.CategoryEntity, {
            where: {
                id: store.getIdAsNumber().toString(),
            },
        });
        return this.toDomainCategory(updatedStore);
    },
    toDomainCategories(categories) {
        const domainCategory = categories.map((prismaCategory) => this.toDomainCategory(prismaCategory));
        return domainCategory;
    },
    toDomainCategory(prismaCategory) {
        if (!prismaCategory) {
            return null;
        }
        const category = new category_1.Category({
            id: prismaCategory.id,
            name: prismaCategory.name,
            icon: prismaCategory.icon,
            isPublished: prismaCategory.isPublished,
        });
        return category;
    },
});
exports.categoryRepoBase = categoryRepoBase;
exports.categoryRepo = (0, exports.categoryRepoBase)(connection_1.default);
//# sourceMappingURL=category.repository.js.map