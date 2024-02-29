"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatepaymentMethodController = exports.updatepaymentMethodControllerBase = void 0;
const paymentMethod_repository_1 = require("../../../../data/repositories/paymentMethod.repository");
const updateMethod_usecase_1 = require("../../../../usecases/api/paymentMethod/updateMethod.usecase");
const exceptions_1 = require("../../../../core/errors/exceptions");
const updatepaymentMethodControllerBase = (updatepaymentMethodUseCase) => async (req, res, next) => {
    try {
        const paymentMethodId = req.params.paymentMethodId;
        const paymentMethod = await paymentMethod_repository_1.paymentMethodRepo.findOne({
            where: { id: paymentMethodId },
        });
        if (!paymentMethod) {
            exceptions_1.exceptionService.notFoundException({
                message: "No payment method found with id " + paymentMethodId,
            });
        }
        const updatePayload = req.body;
        const result = await updatepaymentMethodUseCase(paymentMethod, updatePayload);
        res.status(201).send({
            message: "paymentMethod updated successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updatepaymentMethodControllerBase = updatepaymentMethodControllerBase;
exports.updatepaymentMethodController = (0, exports.updatepaymentMethodControllerBase)(updateMethod_usecase_1.updatePaymentMethodUseCase);
//# sourceMappingURL=updateMethod.controller.js.map