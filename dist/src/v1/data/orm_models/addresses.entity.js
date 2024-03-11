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
exports.AddressesEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const orders_entity_1 = require("./orders.entity");
let AddressesEntity = class AddressesEntity {
};
exports.AddressesEntity = AddressesEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], AddressesEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
    }),
    __metadata("design:type", String)
], AddressesEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
    }),
    __metadata("design:type", String)
], AddressesEntity.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
    }),
    __metadata("design:type", String)
], AddressesEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
    }),
    __metadata("design:type", String)
], AddressesEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
    }),
    __metadata("design:type", Number)
], AddressesEntity.prototype, "zipCode", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.addresses),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.UserEntity)
], AddressesEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orders_entity_1.OrderEntity, (cart) => cart.paymentMethod),
    __metadata("design:type", Array)
], AddressesEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: "deletedAt" }),
    __metadata("design:type", Date)
], AddressesEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "createdAt" }),
    __metadata("design:type", Date)
], AddressesEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updatedAt" }),
    __metadata("design:type", Date)
], AddressesEntity.prototype, "updatedAt", void 0);
exports.AddressesEntity = AddressesEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "Addresses",
    })
], AddressesEntity);
//# sourceMappingURL=addresses.entity.js.map