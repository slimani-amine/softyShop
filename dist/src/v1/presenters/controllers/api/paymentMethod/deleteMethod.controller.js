"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayementMethodController = exports.deletePayementMethodControllerBase = void 0;
const deleteMethod_usecase_1 = require("../../../../usecases/api/paymentMethod/deleteMethod.usecase");
const deletePayementMethodControllerBase = (deletePayementMethodUseCase) => async (req, res, next) => {
    try {
        const result = await deletePayementMethodUseCase(req === null || req === void 0 ? void 0 : req.params);
        res.status(200).send({
            message: "success",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deletePayementMethodControllerBase = deletePayementMethodControllerBase;
exports.deletePayementMethodController = (0, exports.deletePayementMethodControllerBase)(deleteMethod_usecase_1.deletePaymentMethodUseCase);
//# sourceMappingURL=deleteMethod.controller.js.map