"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPaymentMethodsUseCase = exports.getAllPaymentMethodsUseCaseBase = void 0;
const paymentMethod_repository_1 = require("../../../data/repositories/paymentMethod.repository");
const getAllPaymentMethodsUseCaseBase = (dependencies) => async (queryParams) => {
    const paymentMethodsFound = await dependencies.paymentMethodRepo.findByQuery(queryParams);
    return paymentMethodsFound;
};
exports.getAllPaymentMethodsUseCaseBase = getAllPaymentMethodsUseCaseBase;
exports.getAllPaymentMethodsUseCase = (0, exports.getAllPaymentMethodsUseCaseBase)({
    paymentMethodRepo: paymentMethod_repository_1.paymentMethodRepo,
});
//# sourceMappingURL=getAllMethods.usecase.js.map