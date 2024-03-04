"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPasswordResetInformationRepository = exports.userPasswordResetInformationRepositoryBase = void 0;
const connection_1 = require("../connection");
const user_1 = require("../../domain/users/user");
const users_repository_1 = require("./users.repository");
const resetpassword_entity_1 = require("../orm_models/resetpassword.entity");
const userPasswordResetInformationRepositoryBase = (dbConnection = connection_1.dataSource) => ({
    manager: dbConnection.manager,
    async findOne(findData) {
        const passwordResetInformation = await this.manager.findOne(resetpassword_entity_1.ResetPasswordEntity, findData);
        return this.toDomainUserResetPasswordInformation(passwordResetInformation);
    },
    async updateOne(userResetPasswordInformation, payload) {
        await this.manager.update(resetpassword_entity_1.ResetPasswordEntity, {
            id: userResetPasswordInformation.getIdAsNumber(),
        }, {
            user_id: payload === null || payload === void 0 ? void 0 : payload.user_id,
            expirationDate: payload === null || payload === void 0 ? void 0 : payload.expirationDate,
            token: payload === null || payload === void 0 ? void 0 : payload.token,
        });
        const updatedUserResetPasswordInformation = await this.manager.findOne(resetpassword_entity_1.ResetPasswordEntity, {
            where: {
                id: userResetPasswordInformation.getIdAsNumber().toString(),
            },
        });
        return this.toDomainUserResetPasswordInformation(updatedUserResetPasswordInformation);
    },
    async deleteOne(userResetPasswordInformation) {
        const result = await this.manager.delete(resetpassword_entity_1.ResetPasswordEntity, {
            id: userResetPasswordInformation.getIdAsNumber(),
        });
        return result !== null ? 1 : 0;
    },
    async deleteMany(payload) {
        const result = await this.manager.delete(resetpassword_entity_1.ResetPasswordEntity, payload);
        return result.affected;
    },
    async create(payload) {
        const entity = this.manager.create(resetpassword_entity_1.ResetPasswordEntity, {
            token: payload.token,
            user_id: parseInt(payload.userId),
            expirationDate: payload.expirationDate,
        });
        const result = await this.manager.save(resetpassword_entity_1.ResetPasswordEntity, entity);
        return this.toDomainUserResetPasswordInformation(result);
    },
    toDomainUserResetPasswordInformations(usersResetPasswordsInformation) {
        const domainUsersResetPasswordsInformation = usersResetPasswordsInformation.map((prismaUserResetPasswordInformation) => this.toDomainUserResetPasswordInformation(prismaUserResetPasswordInformation));
        return domainUsersResetPasswordsInformation;
    },
    toDomainUserResetPasswordInformation(prismaUserResetPasswordInformation) {
        if (!prismaUserResetPasswordInformation) {
            return null;
        }
        const userPasswordResetInformation = new user_1.UserPasswordResetInformation({
            id: prismaUserResetPasswordInformation.id.toString(),
            token: prismaUserResetPasswordInformation.token,
            createdAt: prismaUserResetPasswordInformation.createdAt,
            updatedAt: prismaUserResetPasswordInformation.updatedAt,
            userId: prismaUserResetPasswordInformation.user_id,
            user: (0, users_repository_1.usersRepoBase)(connection_1.dataSource).toDomainUser(prismaUserResetPasswordInformation.user),
        });
        return userPasswordResetInformation;
    },
});
exports.userPasswordResetInformationRepositoryBase = userPasswordResetInformationRepositoryBase;
exports.userPasswordResetInformationRepository = (0, exports.userPasswordResetInformationRepositoryBase)(connection_1.dataSource);
//# sourceMappingURL=userPasswordResetInformation.repository.js.map