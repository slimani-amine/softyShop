"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserCartProductController = exports.getUserCartProductControllerBase = void 0;
const exceptions_1 = require("../../../../core/errors/exceptions");
const getUserCartProduct_usecase_1 = require("../../../../usecases/api/cartProduct/getUserCartProduct.usecase");
const getUserCartProductControllerBase = (getUserCartProductUseCase) => async (req, res, next) => {
    var _a;
    const cartId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.cartId;
    try {
        if (!cartId) {
            exceptions_1.exceptionService.notFoundException({
                message: "you have not a cart ",
            });
        }
        const result = await getUserCartProductUseCase({ cartId });
        res.status(200).send({
            message: "success",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getUserCartProductControllerBase = getUserCartProductControllerBase;
exports.getUserCartProductController = (0, exports.getUserCartProductControllerBase)(getUserCartProduct_usecase_1.getUserCartProductUseCase);
//# sourceMappingURL=getUserCartProduct.controller.js.map