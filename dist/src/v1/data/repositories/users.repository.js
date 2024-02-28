"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRepo = exports.usersRepoBase = void 0;
const user_entity_1 = require("../orm_models/user.entity");
const apiFeatures_util_1 = require("../../utils/querying/apiFeatures.util");
const user_1 = require("../../domain/users/user");
const connection_1 = require("../connection");
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
        console.log("🚀 ~ updateOne ~ payload:", payload);
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
        const user = this.manager.create(user_entity_1.UserEntity, {
            email: payload.email,
            isVerified: payload.isVerified,
            picture: payload.picture,
            username: payload.username,
            password: payload.password,
            role: payload.role,
            phoneNumber: payload.phoneNumber,
            confirmation_token: payload.confirmation_token,
            confirmed_email: payload.confirmed_email,
        });
        const result = await this.manager.save(user_entity_1.UserEntity, user);
        return this.toDomainUser(result);
    },
    async findByQuery(queryParams) {
        const result = await apiFeatures_util_1.ApiFeatures.generateSqlQuery(connection_1.default, 'users', queryParams, {
            id: {
                operator: 'eq',
            },
            email: {
                operator: 'eq',
            },
            'resetPassword.id': {
                operator: 'injoin',
                joinTables: {
                    ResetPasswords: {
                        selectedFields: ['id', 'token'],
                    },
                },
            },
        });
        return {
            docs: this.toDomainUsers(result.docs),
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
            username: prismaUser.username,
            password: prismaUser.password,
            role: prismaUser.role,
            phoneNumber: prismaUser.phoneNumber,
            confirmation_token: prismaUser.confirmation_token,
            confirmed_email: prismaUser.confirmed_email,
        });
        return user;
    },
});
exports.usersRepoBase = usersRepoBase;
exports.usersRepo = (0, exports.usersRepoBase)(connection_1.default);
//# sourceMappingURL=users.repository.js.map