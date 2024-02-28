"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccountVerificationTokenForUser = void 0;
const generateResetPasswordToken_util_1 = require("./generateResetPasswordToken.util");
const generateAccountVerificationTokenForUser = (user) => {
    const token = (0, generateResetPasswordToken_util_1.generateResetPasswordToken)(user);
    return token;
};
exports.generateAccountVerificationTokenForUser = generateAccountVerificationTokenForUser;
//# sourceMappingURL=generateAccountVerificationToken.util.js.map