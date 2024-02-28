"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestPasswordResetUseCase = exports.validatePasswordResetRequestPayload = exports.requestPasswordResetUseCaseBase = void 0;
const config_1 = require("../../../config");
const exceptions_1 = require("../../core/errors/exceptions");
const userPasswordResetInformation_repository_1 = require("../../data/repositories/userPasswordResetInformation.repository");
const users_repository_1 = require("../../data/repositories/users.repository");
const sendResetPasswordMail_usecase_1 = require("../api/mailing/sendResetPasswordMail.usecase");
const generateResetPasswordToken_util_1 = require("../../utils/tokenUtils/generateResetPasswordToken.util");
const validate_schema_1 = require("../../utils/validation/validate.schema");
const requestPasswordReset_schema_1 = require("../../presenters/schemas/auth/requestPasswordReset.schema");
const errors_1 = require("../../domain/auth/errors");
const requestPasswordResetUseCaseBase = (dependencies) => async (payload) => {
    validatePasswordResetRequestPayload(payload);
    const userFound = await dependencies.usersRepo.findOne({
        where: {
            email: payload.email,
        },
    });
    if (!userFound) {
        exceptions_1.exceptionService.notFoundException({
            message: errors_1.ACCOUNT_NOT_FOUND_ERROR_MESSAGE,
        });
    }
    const resetPasswordToken = (0, generateResetPasswordToken_util_1.generateResetPasswordToken)(userFound);
    const userPasswordResetInfo = await dependencies.userPasswordResetInformationsRepo.findOne({
        where: {
            user_id: userFound.getIdAsNumber(),
        },
    });
    if (!userPasswordResetInfo) {
        await dependencies.userPasswordResetInformationsRepo.create({
            userId: userFound.id,
            expirationDate: new Date(Date.now() + 600000),
            token: resetPasswordToken,
        });
    }
    else {
        await dependencies.userPasswordResetInformationsRepo.updateOne(userPasswordResetInfo, {
            token: resetPasswordToken,
        });
    }
    const link = `${config_1.FRONT_END_BASE_URL}/reset-password/${resetPasswordToken}`;
    await dependencies.sendUserPasswordResetMailUseCase(userFound, {
        link,
    });
    return {
        user: userFound,
    };
};
exports.requestPasswordResetUseCaseBase = requestPasswordResetUseCaseBase;
function validatePasswordResetRequestPayload(payload) {
    (0, validate_schema_1.validatePayloadSchema)(requestPasswordReset_schema_1.default, payload);
    return true;
}
exports.validatePasswordResetRequestPayload = validatePasswordResetRequestPayload;
exports.requestPasswordResetUseCase = (0, exports.requestPasswordResetUseCaseBase)({
    usersRepo: users_repository_1.usersRepo,
    userPasswordResetInformationsRepo: userPasswordResetInformation_repository_1.userPasswordResetInformationRepository,
    sendUserPasswordResetMailUseCase: sendResetPasswordMail_usecase_1.sendUserPasswordResetMailUseCase,
});
//# sourceMappingURL=requestPasswordReset.usecase.js.map