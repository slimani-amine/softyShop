"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRepo = exports.usersRepoBase = void 0;
const user_entity_1 = require("../orm_models/user.entity");
const apiFeatures_util_1 = require("../../utils/querying/apiFeatures.util");
const user_1 = require("../../domain/users/user");
const connection_1 = require("../connection");
const cart_repsitory_1 = require("./cart.repsitory");
const usersRepoBase = (dbConnection) => ({
    manager: dbConnection.manager,
    async findOne(findData) {
        const user = await this.manager.findOne(user_entity_1.UserEntity, findData);
        return this.toDomainUser(user);
    },
    async findAll(findData) {
        const users = await this.manager.find(user_entity_1.UserEntity, findData);
        return this.toDomainUsers(users);
    },
    async updateMany(updatePayload) {
        const result = await this.manager.update(user_entity_1.UserEntity, updatePayload.where, updatePayload.data);
        return result.affected;
    },
    async updateOne(user, payload) {
        await this.manager.update(user_entity_1.UserEntity, {
            id: user.getIdAsNumber(),
        }, payload);
        const updatedUser = await this.manager.findOne(user_entity_1.UserEntity, {
            where: {
                id: user.getIdAsNumber(),
            },
        });
        return this.toDomainUser(updatedUser);
    },
    async deleteOne(user) {
        const result = await this.manager.softDelete(user_entity_1.UserEntity, {
            id: user.getIdAsNumber(),
        });
        return result !== null ? 1 : 0;
    },
    async deleteMany(payload) {
        const result = await this.manager.softDelete(user_entity_1.UserEntity, payload);
        return result.affected;
    },
    async getUserPassword(user) {
        const userFound = await this.manager.findOne(user_entity_1.UserEntity, {
            where: {
                id: user.getIdAsNumber(),
            },
            select: {
                password: true,
            },
        });
        return userFound.password;
    },
    async create(payload) {
        let cart;
        if ((payload === null || payload === void 0 ? void 0 : payload.role) !== "admin") {
            cart = await cart_repsitory_1.cartRepo.createCart();
        }
        const user = this.manager.create(user_entity_1.UserEntity, {
            email: payload.email,
            isVerified: payload.isVerified,
            picture: payload.picture,
            firstName: payload.firstName,
            lastName: payload.lastName,
            password: payload.password,
            role: payload.role,
            phoneNumber: payload.phoneNumber,
            confirmation_token: payload.confirmation_token,
            confirmed_email: payload.confirmed_email,
            cart: cart,
        });
        const result = await this.manager.save(user_entity_1.UserEntity, user);
        return this.toDomainUser(result);
    },
    async findByQuery(queryParams) {
        const result = await apiFeatures_util_1.ApiFeatures.generateSqlQuery(connection_1.default, "users", queryParams, {
            id: {
                operator: "eq",
                filter: true,
            },
            email: {
                operator: "eq",
            },
            role: {
                operator: "eq",
            },
            firstName: {
                operator: "like",
            },
            lastName: {
                operator: "like",
            },
            "resetPassword.id": {
                operator: "injoin",
                joinTables: {
                    ResetPasswords: {
                        selectedFields: ["id", "token"],
                    },
                },
            },
        });
        console.log(result);
        return {
            docs: result.docs,
            meta: result.meta,
        };
    },
    toDomainUsers(users) {
        const domainUsers = users.map((prismaUser) => this.toDomainUser(prismaUser));
        return domainUsers;
    },
    toDomainUser(prismaUser) {
        if (!prismaUser) {
            return null;
        }
        const user = new user_1.User({
            id: prismaUser.id.toString(),
            email: prismaUser.email,
            isVerified: prismaUser.isVerified,
            picture: prismaUser.picture,
            firstName: prismaUser.firstName,
            lastName: prismaUser.lastName,
            password: prismaUser.password,
            role: prismaUser.role,
            phoneNumber: prismaUser.phoneNumber,
            confirmation_token: prismaUser.confirmation_token,
            confirmed_email: prismaUser.confirmed_email,
            cart: prismaUser.cart,
        });
        return user;
    },
});
exports.usersRepoBase = usersRepoBase;
exports.usersRepo = (0, exports.usersRepoBase)(connection_1.default);
//# sourceMappingURL=users.repository.js.map