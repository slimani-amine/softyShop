"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentMethodRepo = exports.paymentMethodRepoBase = void 0;
const apiFeatures_util_1 = require("../../utils/querying/apiFeatures.util");
const paymentMethod_entity_1 = require("../orm_models/paymentMethod.entity");
const connection_1 = require("../connection");
const paymentMethod_1 = require("../../domain/paymentMethod/paymentMethod");
const paymentMethodRepoBase = (dbConnection) => ({
    manager: dbConnection.manager,
    async findOne(findData) {
        const paymentMethod = await this.manager.findOne(paymentMethod_entity_1.PaymentMethodEntity, findData);
        return this.toDomainPaymentMethod(paymentMethod);
    },
    async findAll(findData) {
        const paymentMethods = await this.manager.find(paymentMethod_entity_1.PaymentMethodEntity, findData);
        return this.toDomainPaymentMethods(paymentMethods);
    },
    async createPaymentMethod(payload) {
        const paymentMethod = this.manager.create(paymentMethod_entity_1.PaymentMethodEntity, {
            name: payload.name,
            icon: payload.icon,
        });
        const result = await this.manager.save(paymentMethod_entity_1.PaymentMethodEntity, paymentMethod);
        return this.toDomainPaymentMethod(result);
    },
    async deletePaymentMethod(paymentMethod) {
        const result = await this.manager.softDelete(paymentMethod_entity_1.PaymentMethodEntity, paymentMethod.id);
        return result !== null ? 1 : 0;
    },
    async findByQuery(queryParams) {
        const result = await apiFeatures_util_1.ApiFeatures.generateSqlQuery(connection_1.default, "paymentMethod", queryParams, {});
        return {
            docs: this.toDomainPaymentMethods(result.docs),
            meta: result.meta,
        };
    },
    async updatePaymentMethod(paymentMethod, payload) {
        await this.manager.update(paymentMethod_entity_1.PaymentMethodEntity, {
            id: paymentMethod.getIdAsNumber(),
        }, payload);
        const updatedPaymentMethod = await this.manager.findOne(paymentMethod_entity_1.PaymentMethodEntity, {
            where: {
                id: paymentMethod.getIdAsNumber().toString(),
            },
        });
        return this.toDomainPaymentMethod(updatedPaymentMethod);
    },
    toDomainPaymentMethods(paymentMethods) {
        const domainPaymentMethod = paymentMethods.map((prismaPaymentMethod) => this.toDomainPaymentMethod(prismaPaymentMethod));
        return domainPaymentMethod;
    },
    toDomainPaymentMethod(prismaPaymentMethod) {
        if (!prismaPaymentMethod) {
            return null;
        }
        const paymentMethod = new paymentMethod_1.PaymentMethod({
            id: prismaPaymentMethod.id,
            name: prismaPaymentMethod.name,
            icon: prismaPaymentMethod.icon,
        });
        return paymentMethod;
    },
});
exports.paymentMethodRepoBase = paymentMethodRepoBase;
exports.paymentMethodRepo = (0, exports.paymentMethodRepoBase)(connection_1.default);
//# sourceMappingURL=paymentMethod.repository.js.map