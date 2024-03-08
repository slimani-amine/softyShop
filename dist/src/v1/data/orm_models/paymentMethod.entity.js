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
exports.PaymentMethodEntity = void 0;
const typeorm_1 = require("typeorm");
const orders_entity_1 = require("./orders.entity");
let PaymentMethodEntity = class PaymentMethodEntity {
};
exports.PaymentMethodEntity = PaymentMethodEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], PaymentMethodEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
    }),
    __metadata("design:type", String)
], PaymentMethodEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
    }),
    __metadata("design:type", String)
], PaymentMethodEntity.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orders_entity_1.OrderEntity, (cart) => cart.paymentMethod),
    __metadata("design:type", Array)
], PaymentMethodEntity.prototype, "paymentMethods", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: "deletedAt" }),
    __metadata("design:type", Date)
], PaymentMethodEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "createdAt" }),
    __metadata("design:type", Date)
], PaymentMethodEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updatedAt" }),
    __metadata("design:type", Date)
], PaymentMethodEntity.prototype, "updatedAt", void 0);
exports.PaymentMethodEntity = PaymentMethodEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "PaymentMethod",
    })
], PaymentMethodEntity);
//# sourceMappingURL=paymentMethod.entity.js.map