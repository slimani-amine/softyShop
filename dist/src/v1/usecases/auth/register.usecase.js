"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUseCase = exports.validateRegisterPayload = exports.registerUseCaseBase = void 0;
const logger_1 = require("../../core/logger/logger");
const users_repository_1 = require("../../data/repositories/users.repository");
const bcryptjs = require("bcryptjs");
const requestAccountVerification_usecase_1 = require("./requestAccountVerification.usecase");
const createUserTokens_usecase_1 = require("./createUserTokens.usecase");
const exceptions_1 = require("../../core/errors/exceptions");
const validate_schema_1 = require("../../utils/validation/validate.schema");
const register_schema_1 = require("../../presenters/schemas/auth/register.schema");
const errors_1 = require("../../domain/auth/errors");
const registerUseCaseBase = (dependencies = {
    usersRepo: users_repository_1.usersRepo,
    generateAndSendUserAccountVerificationEmail: requestAccountVerification_usecase_1.generateAndSendUserAccountVerificationEmail,
    createUserTokensUseCase: createUserTokens_usecase_1.createUserTokensUseCase,
}) => async (payload) => {
    validateRegisterPayload(payload);
    const userFound = await dependencies.usersRepo.findOne({
        where: [{ email: payload.email }],
    });
    console.log("🚀 ~ userFound:", userFound);
    if (userFound) {
        exceptions_1.exceptionService.badRequestException({
            message: errors_1.ACCOUNT_ALREADY_EXISTS_ERROR_MESSAGE,
        });
    }
    const salt = bcryptjs.genSaltSync(10);
    const password = bcryptjs.hashSync(payload.password, salt);
    const userCreated = await dependencies.usersRepo.create({
        id: payload.id,
        email: payload.email,
        isVerified: payload.isVerified,
        picture: payload.picture,
        username: payload.username,
        password: password,
        role: payload.role,
        phoneNumber: payload.phoneNumber,
        confirmation_token: payload.confirmation_token,
        confirmed_email: payload.confirmed_email,
    });
    logger_1.logger.log('REGISTER USE CASE', JSON.stringify(userCreated));
    const tokens = await dependencies.createUserTokensUseCase(userCreated);
    return Object.assign({ user: userCreated }, tokens);
};
exports.registerUseCaseBase = registerUseCaseBase;
function validateRegisterPayload(payload) {
    (0, validate_schema_1.trimAndValidateSchemaPayload)(register_schema_1.default, payload);
    return payload;
}
exports.validateRegisterPayload = validateRegisterPayload;
exports.registerUseCase = (0, exports.registerUseCaseBase)({
    usersRepo: users_repository_1.usersRepo,
    generateAndSendUserAccountVerificationEmail: requestAccountVerification_usecase_1.generateAndSendUserAccountVerificationEmail,
    createUserTokensUseCase: createUserTokens_usecase_1.createUserTokensUseCase,
});
//# sourceMappingURL=register.usecase.js.map