"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUseCase = exports.validateLoginPayload = exports.loginUseCaseBase = void 0;
const exceptions_1 = require("../../core/errors/exceptions");
const logger_1 = require("../../core/logger/logger");
const users_repository_1 = require("../../data/repositories/users.repository");
const bcryptjs = require("bcryptjs");
const createUserTokens_usecase_1 = require("./createUserTokens.usecase");
const validate_schema_1 = require("../../utils/validation/validate.schema");
const login_schema_1 = require("../../presenters/schemas/auth/login.schema");
const errors_1 = require("../../domain/auth/errors");
const loginUseCaseBase = (dependencies) => async (loginData) => {
    validateLoginPayload(loginData);
    const userFound = await dependencies.usersRepo.findOne({
        where: {
            email: loginData.email,
        },
    });
    if (!userFound) {
        exceptions_1.exceptionService.notFoundException({
            message: errors_1.ACCOUNT_NOT_FOUND_ERROR_MESSAGE,
        });
    }
    const userPassword = await users_repository_1.usersRepo.getUserPassword(userFound);
    if (!bcryptjs.compareSync(loginData.password, userPassword)) {
        exceptions_1.exceptionService.badRequestException({
            message: errors_1.BAD_LOGIN_CREDENTIALS_ERROR_MESSAGE,
        });
    }
    logger_1.logger.log("LOGIN USE CASE", JSON.stringify(userFound));
    const tokens = await dependencies.createUserTokensUseCase(userFound);
    return Object.assign({ user: userFound }, tokens);
};
exports.loginUseCaseBase = loginUseCaseBase;
function validateLoginPayload(payload) {
    (0, validate_schema_1.trimAndValidateSchemaPayload)(login_schema_1.default, payload);
    return true;
}
exports.validateLoginPayload = validateLoginPayload;
exports.loginUseCase = (0, exports.loginUseCaseBase)({
    usersRepo: users_repository_1.usersRepo,
    createUserTokensUseCase: createUserTokens_usecase_1.createUserTokensUseCase,
});
//# sourceMappingURL=login.usecase.js.map