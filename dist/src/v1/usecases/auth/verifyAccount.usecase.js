"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccountUseCase = exports.validateVerifyAccountPayload = exports.verifyAccountUseCaseBase = void 0;
const logger_1 = require("../../core/logger/logger");
const users_repository_1 = require("../../data/repositories/users.repository");
const createUserTokens_usecase_1 = require("./createUserTokens.usecase");
const exceptions_1 = require("../../core/errors/exceptions");
const validate_schema_1 = require("../../utils/validation/validate.schema");
const verifyAccount_schema_1 = require("../../presenters/schemas/auth/verifyAccount.schema");
const errors_1 = require("../../domain/auth/errors");
const verifyAccountUseCaseBase = (dependencies = { usersRepo: users_repository_1.usersRepo, createUserTokensUseCase: createUserTokens_usecase_1.createUserTokensUseCase }) => async (payload) => {
    validateVerifyAccountPayload(payload);
    const userFound = await dependencies.usersRepo.findOne({
        where: {
            confirmation_token: payload.code,
            confirmed_email: false,
        },
    });
    if (!userFound) {
        logger_1.logger.log('VERIFY ACCOUNT USE CASE', `FAILED TOKEN ${payload.code}`);
        exceptions_1.exceptionService.badRequestException({
            message: errors_1.ACCOUNT_VERIFICATION_ERROR_MESSAGE,
        });
    }
    const updatedUser = await dependencies.usersRepo.updateOne(userFound, {
        confirmed_email: true,
    });
    logger_1.logger.log('VERIFY ACCOUNT USE CASE', `SUCCEEDED FOR USER ${userFound.id}`);
    const result = await dependencies.createUserTokensUseCase(updatedUser);
    return {
        user: updatedUser,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
    };
};
exports.verifyAccountUseCaseBase = verifyAccountUseCaseBase;
function validateVerifyAccountPayload(payload) {
    (0, validate_schema_1.validatePayloadSchema)(verifyAccount_schema_1.default, payload);
    return true;
}
exports.validateVerifyAccountPayload = validateVerifyAccountPayload;
exports.verifyAccountUseCase = (0, exports.verifyAccountUseCaseBase)({
    usersRepo: users_repository_1.usersRepo,
    createUserTokensUseCase: createUserTokens_usecase_1.createUserTokensUseCase,
});
//# sourceMappingURL=verifyAccount.usecase.js.map