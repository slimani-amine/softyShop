"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRepo = exports.addressRepoBase = void 0;
const addresses_entity_1 = require("../orm_models/addresses.entity");
const addresses_1 = require("../../domain/addresses/addresses");
const connection_1 = require("../connection");
const apiFeatures_util_1 = require("../../utils/querying/apiFeatures.util");
const user_entity_1 = require("../orm_models/user.entity");
const exceptions_1 = require("../../core/errors/exceptions");
const addressRepoBase = (dbConnection) => ({
    manager: dbConnection.manager,
    async findOne(findData) {
        const address = await this.manager.findOne(addresses_entity_1.AddressesEntity, findData);
        return this.toDomainAddress(address);
    },
    async findAll(findData) {
        const addresses = await this.manager.find(addresses_entity_1.AddressesEntity, findData);
        return this.toDomainAddresses(addresses);
    },
    async findMyAddresses(findOptions) {
        const stores = await this.manager.find(addresses_entity_1.AddressesEntity, findOptions);
        return this.toDomainAddresses(stores);
    },
    async createAddress(payload) {
        const user = await this.manager.findOne(user_entity_1.UserEntity, {
            where: { id: payload.user_id },
        });
        if (!user) {
            exceptions_1.exceptionService.notFoundException({
                message: "User not found",
            });
        }
        const address = this.manager.create(addresses_entity_1.AddressesEntity, {
            address: payload.address,
            phoneNumber: payload === null || payload === void 0 ? void 0 : payload.phoneNumber,
            city: payload.city,
            state: payload.state,
            zipCode: payload.zipCode,
            user: user,
        });
        const result = await this.manager.save(addresses_entity_1.AddressesEntity, address);
        return this.toDomainAddress(result);
    },
    async updateAddress(address, payload) {
        await this.manager.update(addresses_entity_1.AddressesEntity, {
            id: address.getIdAsNumber(),
        }, payload);
        const updatedAddress = await this.manager.findOne(addresses_entity_1.AddressesEntity, {
            where: {
                id: address.getIdAsNumber().toString(),
            },
        });
        return this.toDomainAddress(updatedAddress);
    },
    async deleteAddress(address) {
        const result = await this.manager.softDelete(addresses_entity_1.AddressesEntity, {
            id: address.getIdAsNumber(),
        });
        return result !== null ? 1 : 0;
    },
    async deleteMany(payload) {
        const result = await this.manager.softDelete(addresses_entity_1.AddressesEntity, payload);
        return result.affected;
    },
    async findByQuery(queryParams) {
        const result = await apiFeatures_util_1.ApiFeatures.generateSqlQuery(connection_1.default, "addresses", queryParams, {});
        return {
            docs: this.toDomainAddresses(result.docs),
            meta: result.meta,
        };
    },
    toDomainAddresses(addresses) {
        const domainAddresses = addresses.map((prismaAddress) => this.toDomainAddress(prismaAddress));
        return domainAddresses;
    },
    toDomainAddress(prismaAddress) {
        if (!prismaAddress) {
            return null;
        }
        const address = new addresses_1.Address({
            id: prismaAddress.id,
            address: prismaAddress.address,
            phoneNumber: prismaAddress.phoneNumber,
            city: prismaAddress.city,
            state: prismaAddress.state,
            zipCode: prismaAddress.zipCode,
        });
        return address;
    },
});
exports.addressRepoBase = addressRepoBase;
exports.addressRepo = (0, exports.addressRepoBase)(connection_1.default);
//# sourceMappingURL=addresses.repository.js.map