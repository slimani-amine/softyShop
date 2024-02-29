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
exports.SocialMediaLinksEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const store_entity_1 = require("./store.entity");
let SocialMediaLinksEntity = class SocialMediaLinksEntity {
};
exports.SocialMediaLinksEntity = SocialMediaLinksEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], SocialMediaLinksEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
    }),
    __metadata("design:type", String)
], SocialMediaLinksEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
    }),
    __metadata("design:type", String)
], SocialMediaLinksEntity.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
    }),
    __metadata("design:type", String)
], SocialMediaLinksEntity.prototype, "link", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.socialMediaLinks),
    (0, typeorm_1.JoinColumn)({ name: 'admin_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], SocialMediaLinksEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => store_entity_1.StoreEntity, (store) => store.socialMediaLinks),
    (0, typeorm_1.JoinColumn)({ name: 'store_id' }),
    __metadata("design:type", store_entity_1.StoreEntity)
], SocialMediaLinksEntity.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deletedAt' }),
    __metadata("design:type", Date)
], SocialMediaLinksEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'createdAt' }),
    __metadata("design:type", Date)
], SocialMediaLinksEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updatedAt' }),
    __metadata("design:type", Date)
], SocialMediaLinksEntity.prototype, "updatedAt", void 0);
exports.SocialMediaLinksEntity = SocialMediaLinksEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'SocialMediaLinks',
    })
], SocialMediaLinksEntity);
//# sourceMappingURL=socialMedia.entity.js.map