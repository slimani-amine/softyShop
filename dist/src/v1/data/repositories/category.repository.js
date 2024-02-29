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
        });
        const result = await this.manager.save(category_entity_1.CategoryEntity, category);
        return this.toDomainCategory(result);
    },
    async deleteCategory(category) {
        const result = await this.manager.softDelete(category_entity_1.CategoryEntity, category.id);
        return result !== null ? 1 : 0;
    },
    async findByQuery(queryParams) {
        const result = await apiFeatures_util_1.ApiFeatures.generateSqlQuery(connection_1.default, "categories", queryParams, {});
        return {
            docs: this.toDomainCategories(result.docs),
            meta: result.meta,
        };
    },
    async updateCategory(category, payload) {
        await this.manager.update(category_entity_1.CategoryEntity, {
            id: category.getIdAsNumber(),
        }, payload);
        const updatedcategory = await this.manager.findOne(category_entity_1.CategoryEntity, {
            where: {
                id: category.getIdAsNumber().toString(),
            },
        });
        return this.toDomainCategory(updatedcategory);
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
        });
        return category;
    },
});
exports.categoryRepoBase = categoryRepoBase;
exports.categoryRepo = (0, exports.categoryRepoBase)(connection_1.default);
//# sourceMappingURL=category.repository.js.map