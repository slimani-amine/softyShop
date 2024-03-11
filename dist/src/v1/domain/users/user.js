"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPasswordResetInformation = exports.User = void 0;
const idAsNumber_1 = require("../types/idAsNumber");
class User extends idAsNumber_1.NumberId {
    constructor(payload) {
        super(payload.id);
        this.email = payload.email;
        this.isVerified = payload.isVerified;
        this.picture = payload.picture;
        this.firstName = payload.firstName;
        this.lastName = payload.lastName;
        this.role = payload.role;
        this.phoneNumber = payload.phoneNumber;
        this.confirmation_token = payload.confirmation_token;
        this.confirmed_email = payload.confirmed_email;
        this.cart = payload.cart;
    }
}
exports.User = User;
class UserPasswordResetInformation extends idAsNumber_1.NumberId {
    constructor(payload) {
        super(payload.id);
        this.token = payload.token;
        this.userId = payload.userId;
        this.createdAt = payload.createdAt;
        this.updatedAt = payload.updatedAt;
        this.user = payload.user;
    }
}
exports.UserPasswordResetInformation = UserPasswordResetInformation;
//# sourceMappingURL=user.js.map