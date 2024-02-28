"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResetPasswordToken = void 0;
const crypto = require("crypto");
const generateResetPasswordToken = (user) => {
    const randomBytes = crypto.randomBytes(32);
    const token = randomBytes.toString('hex');
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(user.email + token + user.id + Date.now().toString())
        .digest('hex');
    return resetPasswordToken;
};
exports.generateResetPasswordToken = generateResetPasswordToken;
//# sourceMappingURL=generateResetPasswordToken.util.js.map