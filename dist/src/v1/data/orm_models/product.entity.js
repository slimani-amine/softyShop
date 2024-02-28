"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductEntity = void 0;
const typeorm_1 = require("typeorm");
const store_entity_1 = require("./store.entity");
const productCreator_entity_1 = require("./productCreator.entity");
const category_entity_1 = require("./category.entity");
const productBrand_entity_1 = require("./productBrand.entity");
const reviews_entity_1 = require("./reviews.entity");
const wishlist_entity_1 = require("./wishlist.entity");
const cartProduct_entity_1 = require("./cartProduct.entity");
let ProductEntity = class ProductEntity {
};
exports.ProductEntity = ProductEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        unique: true,
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "stockNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
    }),
    __metadata("design:type", Date)
], ProductEntity.prototype, "publishedAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], ProductEntity.prototype, "availability", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], ProductEntity.prototype, "isPublished", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => productCreator_entity_1.ProductCreatorEntity, (productCretor) => productCretor.name),
    __metadata("design:type", Array)
], ProductEntity.prototype, "creator", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => category_entity_1.CategoryEntity, (productCretor) => productCretor.name),
    __metadata("design:type", Array)
], ProductEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => productBrand_entity_1.BrandEntity, (productCretor) => productCretor.name),
    __metadata("design:type", Array)
], ProductEntity.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reviews_entity_1.ReviewsEntity, (review) => review.product),
    __metadata("design:type", Array)
], ProductEntity.prototype, "review", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => wishlist_entity_1.WishlistEntity, (wishlist) => wishlist.product),
    __metadata("design:type", Array)
], ProductEntity.prototype, "wishlist", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cartProduct_entity_1.CartProductEntity, (cartProduct) => cartProduct.product),
    __metadata("design:type", Array)
], ProductEntity.prototype, "cartProduct", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => store_entity_1.StoreEntity, (store) => store.products),
    (0, typeorm_1.JoinColumn)({ name: 'store_id' }),
    __metadata("design:type", store_entity_1.StoreEntity)
], ProductEntity.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deletedAt' }),
    __metadata("design:type", Date)
], ProductEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'createdAt' }),
    __metadata("design:type", Date)
], ProductEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updatedAt' }),
    __metadata("design:type", Date)
], ProductEntity.prototype, "updatedAt", void 0);
exports.ProductEntity = ProductEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'Products',
    })
], ProductEntity);
//# sourceMappingURL=product.entity.js.map