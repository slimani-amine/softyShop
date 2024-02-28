"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendUserPasswordResetMailUseCase = void 0;
const mail_usercase_1 = require("./mail.usercase");
exports.sendUserPasswordResetMailUseCase = (0, mail_usercase_1.mailUserUseCaseBuilder)({
    subject: 'Reset Your Password',
    template: 'reset-password',
});
//# sourceMappingURL=sendResetPasswordMail.usecase.js.map