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
exports.ProductCreatorEntity = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
const store_entity_1 = require("./store.entity");
let ProductCreatorEntity = class ProductCreatorEntity {
};
exports.ProductCreatorEntity = ProductCreatorEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], ProductCreatorEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
    }),
    __metadata("design:type", String)
], ProductCreatorEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.ProductEntity, (product) => product.brand),
    __metadata("design:type", Array)
], ProductCreatorEntity.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => store_entity_1.StoreEntity, (store) => store.brands),
    (0, typeorm_1.JoinColumn)({ name: "store_id" }),
    __metadata("design:type", store_entity_1.StoreEntity)
], ProductCreatorEntity.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: "deletedAt" }),
    __metadata("design:type", Date)
], ProductCreatorEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "createdAt" }),
    __metadata("design:type", Date)
], ProductCreatorEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updatedAt" }),
    __metadata("design:type", Date)
], ProductCreatorEntity.prototype, "updatedAt", void 0);
exports.ProductCreatorEntity = ProductCreatorEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "ProductCreator",
    })
], ProductCreatorEntity);
//# sourceMappingURL=productCreator.entity.js.map