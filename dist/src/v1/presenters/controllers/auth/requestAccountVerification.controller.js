"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestAccountVerificationController = exports.requestAccountVerificationControllerBase = void 0;
const logger_1 = require("../../../core/logger/logger");
const requestAccountVerification_usecase_1 = require("../../../usecases/auth/requestAccountVerification.usecase");
const requestAccountVerificationControllerBase = (requestUserAccountVerificationUseCase) => async (req, res, next) => {
    try {
        logger_1.logger.log('REQUEST ACCOUNT VERIFICATION CONTROLLER', `USER ${req === null || req === void 0 ? void 0 : req.user.id}`);
        const result = await requestUserAccountVerificationUseCase(req === null || req === void 0 ? void 0 : req.user);
        res.status(200).send({
            message: 'An email was sent to check your account',
            data: result.user,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.requestAccountVerificationControllerBase = requestAccountVerificationControllerBase;
exports.requestAccountVerificationController = (0, exports.requestAccountVerificationControllerBase)(requestAccountVerification_usecase_1.requestAccountVerificationUseCase);
//# sourceMappingURL=requestAccountVerification.controller.js.map