"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentMethodUseCase = exports.updatePaymentMethodUseCaseBase = void 0;
const paymentMethod_repository_1 = require("../../../data/repositories/paymentMethod.repository");
const updatePaymentMethodUseCaseBase = (paymentMethodRepository) => async (paymentMethod, updatePayload) => {
    const updatedPaymentMethod = await paymentMethodRepository.updatePaymentMethod(paymentMethod, updatePayload);
    return updatedPaymentMethod;
};
exports.updatePaymentMethodUseCaseBase = updatePaymentMethodUseCaseBase;
exports.updatePaymentMethodUseCase = (0, exports.updatePaymentMethodUseCaseBase)(paymentMethod_repository_1.paymentMethodRepo);
//# sourceMappingURL=updateMethod.usecase.js.map