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
exports.CartEntity = void 0;
const typeorm_1 = require("typeorm");
const cartProduct_entity_1 = require("./cartProduct.entity");
const orders_entity_1 = require("./orders.entity");
let CartEntity = class CartEntity {
};
exports.CartEntity = CartEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CartEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], CartEntity.prototype, "totalQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], CartEntity.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CartEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['credit_cart', 'on_delivery'],
    }),
    __metadata("design:type", String)
], CartEntity.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
    }),
    __metadata("design:type", Date)
], CartEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
    }),
    __metadata("design:type", Date)
], CartEntity.prototype, "estimatedDeliveryDate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cartProduct_entity_1.CartProductEntity, (wishlist) => wishlist.product),
    __metadata("design:type", Array)
], CartEntity.prototype, "cartProduct", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orders_entity_1.OrderEntity, (order) => order.cart),
    __metadata("design:type", Array)
], CartEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deletedAt' }),
    __metadata("design:type", Date)
], CartEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'createdAt' }),
    __metadata("design:type", Date)
], CartEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updatedAt' }),
    __metadata("design:type", Date)
], CartEntity.prototype, "updatedAt", void 0);
exports.CartEntity = CartEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'Cart',
    })
], CartEntity);
//# sourceMappingURL=cart.entity.js.map