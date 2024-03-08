"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestPasswordResetController = exports.requestPasswordResetControllerBase = void 0;
const logger_1 = require("../../../core/logger/logger");
const requestPasswordReset_usecase_1 = require("../../../usecases/auth/requestPasswordReset.usecase");
const requestPasswordResetControllerBase = (requestUserPasswordResetUseCase) => async (req, res, next) => {
    var _a;
    try {
        logger_1.logger.log('REQUEST ACCOUNT PASSWORD RESET CONTROLLER', `USER ${((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email) || 'unknwon'}`);
        const result = await requestUserPasswordResetUseCase(req === null || req === void 0 ? void 0 : req.body);
        res.status(200).send({
            message: 'An email was sent to reset your password',
            data: result.user,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.requestPasswordResetControllerBase = requestPasswordResetControllerBase;
exports.requestPasswordResetController = (0, exports.requestPasswordResetControllerBase)(requestPasswordReset_usecase_1.requestPasswordResetUseCase);
//# sourceMappingURL=requestPasswordReset.controller.js.map