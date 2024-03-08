"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPayementMethodsController = exports.getAllPayementMethodsControllerBase = void 0;
const getAllMethods_usecase_1 = require("../../../../usecases/api/paymentMethod/getAllMethods.usecase");
const getAllPayementMethodsControllerBase = (getAllPayementMethodsUseCase) => async (req, res, next) => {
    try {
        const result = await (0, getAllMethods_usecase_1.getAllPaymentMethodsUseCase)(req === null || req === void 0 ? void 0 : req.query);
        res.status(200).send({
            message: "success",
            data: result.docs,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getAllPayementMethodsControllerBase = getAllPayementMethodsControllerBase;
exports.getAllPayementMethodsController = (0, exports.getAllPayementMethodsControllerBase)(getAllMethods_usecase_1.getAllPaymentMethodsUseCase);
//# sourceMappingURL=getAllMethods.controller.js.map