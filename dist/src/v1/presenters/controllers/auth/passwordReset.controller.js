"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordResetController = exports.passwordResetControllerBase = void 0;
const logger_1 = require("../../../core/logger/logger");
const passwordReset_usecase_1 = require("../../../usecases/auth/passwordReset.usecase");
const passwordResetControllerBase = (passwordResetUseCase) => async (req, res, next) => {
    var _a;
    try {
        logger_1.logger.log('REQUEST ACCOUNT PASSWORD RESET CONTROLLER', `Token ${((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.token) || 'unknwon'}`);
        const result = await passwordResetUseCase(req === null || req === void 0 ? void 0 : req.body);
        res.status(200).send({
            message: 'Reset the password successfully',
            data: result.user,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.passwordResetControllerBase = passwordResetControllerBase;
exports.passwordResetController = (0, exports.passwordResetControllerBase)(passwordReset_usecase_1.passwordResetUseCase);
//# sourceMappingURL=passwordReset.controller.js.map