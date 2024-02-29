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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const store_entity_1 = require("./store.entity");
const paymentMethod_entity_1 = require("./paymentMethod.entity");
const addresses_entity_1 = require("./addresses.entity");
const reviews_entity_1 = require("./reviews.entity");
const wishlist_entity_1 = require("./wishlist.entity");
const cart_entity_1 = require("./cart.entity");
const resetpassword_entity_1 = require("./resetpassword.entity");
let UserEntity = class UserEntity {
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        unique: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ["admin", "vendor", "user"],
        default: "user",
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        nullable: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "confirmation_token", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        default: true,
    }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "confirmed_email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        default: true,
    }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => resetpassword_entity_1.ResetPasswordEntity, (resetPassword) => resetPassword.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "resetPasswords", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => paymentMethod_entity_1.PaymentMethodEntity, (paymentMethod) => paymentMethod.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "paymentMethods", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => addresses_entity_1.AddressesEntity, (address) => address.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "addresses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => store_entity_1.StoreEntity, (store) => store.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reviews_entity_1.ReviewsEntity, (review) => review.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => wishlist_entity_1.WishlistEntity, (wishlist) => wishlist.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "wishlist", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => cart_entity_1.CartEntity),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", cart_entity_1.CartEntity)
], UserEntity.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: "deletedAt" }),
    __metadata("design:type", Date)
], UserEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "createdAt" }),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updatedAt" }),
    __metadata("design:type", Date)
], UserEntity.prototype, "updatedAt", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "Users",
    })
], UserEntity);
//# sourceMappingURL=user.entity.js.map