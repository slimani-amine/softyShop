"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestAccountVerificationUseCase = exports.generateAndSendUserAccountVerificationEmail = exports.requestAccountVerificationUseCaseBase = void 0;
const config_1 = require("../../../config");
const exceptions_1 = require("../../core/errors/exceptions");
const users_repository_1 = require("../../data/repositories/users.repository");
const sendVerificationMail_usecase_1 = require("../api/mailing/sendVerificationMail.usecase");
const generateAccountVerificationToken_util_1 = require("../../utils/tokenUtils/generateAccountVerificationToken.util");
const errors_1 = require("../../domain/auth/errors");
const requestAccountVerificationUseCaseBase = (dependencies) => async (user) => {
    const userFound = await dependencies.usersRepo.findOne({
        where: {
            id: user.id,
            confirmed_email: false,
        },
    });
    if (!userFound) {
        exceptions_1.exceptionService.notFoundException({
            message: errors_1.ACCOUNT_NOT_FOUND_ERROR_MESSAGE,
        });
    }
    await dependencies.generateAndSendUserAccountVerificationEmail(userFound, dependencies.usersRepo);
    return {
        user: userFound,
    };
};
exports.requestAccountVerificationUseCaseBase = requestAccountVerificationUseCaseBase;
async function generateAndSendUserAccountVerificationEmail(user, usersRepo) {
    const verificationToken = (0, generateAccountVerificationToken_util_1.generateAccountVerificationTokenForUser)(user);
    await usersRepo.updateOne(user, {
        confirmation_token: verificationToken,
    });
    const link = `${config_1.FRONT_END_BASE_URL}/verify-account/${verificationToken}`;
    await (0, sendVerificationMail_usecase_1.sendUserVerificationMailUseCase)(user, {
        link: link,
    });
    return link;
}
exports.generateAndSendUserAccountVerificationEmail = generateAndSendUserAccountVerificationEmail;
exports.requestAccountVerificationUseCase = (0, exports.requestAccountVerificationUseCaseBase)({
    usersRepo: users_repository_1.usersRepo,
    generateAndSendUserAccountVerificationEmail: generateAndSendUserAccountVerificationEmail,
});
//# sourceMappingURL=requestAccountVerification.usecase.js.map