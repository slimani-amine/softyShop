"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordResetUseCase = exports.validatePasswordResetPayload = exports.passwordResetUseCaseBase = void 0;
const exceptions_1 = require("../../core/errors/exceptions");
const userPasswordResetInformation_repository_1 = require("../../data/repositories/userPasswordResetInformation.repository");
const users_repository_1 = require("../../data/repositories/users.repository");
const bcryptjs = require("bcryptjs");
const validate_schema_1 = require("../../utils/validation/validate.schema");
const passwordReset_schema_1 = require("../../presenters/schemas/auth/passwordReset.schema");
const errors_1 = require("../../domain/auth/errors");
const passwordResetUseCaseBase = (dependencies) => async (payload) => {
    validatePasswordResetPayload(payload);
    const passwordResetInformationFound = await dependencies.userPasswordResetInformationsRepo.findOne({
        where: {
            token: payload.token,
        },
        relations: {
            user: true,
        },
    });
    if (!passwordResetInformationFound) {
        exceptions_1.exceptionService.unauthorizedException({
            message: errors_1.RESET_PASSWORD_UNAUTHORIZED_ERROR_MESSAGE,
        });
    }
    if (!passwordResetInformationFound.user) {
        exceptions_1.exceptionService.badRequestException({
            message: errors_1.ACCOUNT_NOT_FOUND_ERROR_MESSAGE,
        });
    }
    if (passwordResetInformationFound.expirationDate < new Date()) {
        exceptions_1.exceptionService.badRequestException({
            message: errors_1.RESET_PASSWORD_EXPIRED_ERROR_MESSAGE,
        });
    }
    const salt = bcryptjs.genSaltSync(10);
    const password = bcryptjs.hashSync(payload.newPassword, salt);
    const updatedUser = await dependencies.usersRepo.updateOne(passwordResetInformationFound.user, {
        password: password,
    });
    await dependencies.userPasswordResetInformationsRepo.deleteOne(passwordResetInformationFound);
    return {
        user: updatedUser,
    };
};
exports.passwordResetUseCaseBase = passwordResetUseCaseBase;
function validatePasswordResetPayload(payload) {
    (0, validate_schema_1.validatePayloadSchema)(passwordReset_schema_1.default, payload);
    return true;
}
exports.validatePasswordResetPayload = validatePasswordResetPayload;
exports.passwordResetUseCase = (0, exports.passwordResetUseCaseBase)({
    usersRepo: users_repository_1.usersRepo,
    userPasswordResetInformationsRepo: userPasswordResetInformation_repository_1.userPasswordResetInformationRepository,
});
//# sourceMappingURL=passwordReset.usecase.js.map