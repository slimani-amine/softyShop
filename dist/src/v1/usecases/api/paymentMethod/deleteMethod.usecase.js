"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaymentMethodUseCase = exports.deletePaymentMethodUseCaseBase = void 0;
const exceptions_1 = require("../../../core/errors/exceptions");
const paymentMethod_repository_1 = require("../../../data/repositories/paymentMethod.repository");
const deletePaymentMethodUseCaseBase = (dependencies = {
    paymentMethodRepo: paymentMethod_repository_1.paymentMethodRepo,
}) => async (params) => {
    const paymentMethod = await dependencies.paymentMethodRepo.findOne({
        where: { id: params.id },
    });
    if (!paymentMethod) {
        exceptions_1.exceptionService.notFoundException({
            message: "Payment Method not found",
        });
    }
    const result = await dependencies.paymentMethodRepo.deletePaymentMethod(paymentMethod);
    return {
        success: result === 1,
    };
};
exports.deletePaymentMethodUseCaseBase = deletePaymentMethodUseCaseBase;
exports.deletePaymentMethodUseCase = (0, exports.deletePaymentMethodUseCaseBase)({
    paymentMethodRepo: paymentMethod_repository_1.paymentMethodRepo,
});
//# sourceMappingURL=deleteMethod.usecase.js.map