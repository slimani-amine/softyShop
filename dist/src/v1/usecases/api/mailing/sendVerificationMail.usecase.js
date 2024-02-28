"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendUserVerificationMailUseCase = void 0;
const mail_usercase_1 = require("./mail.usercase");
exports.sendUserVerificationMailUseCase = (0, mail_usercase_1.mailUserUseCaseBuilder)({
    subject: 'Verify Your Email',
    template: 'verification',
});
//# sourceMappingURL=sendVerificationMail.usecase.js.map