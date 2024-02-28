"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDefaultProfilePicIfNotGiven = void 0;
const config_1 = require("../../../../config");
const setDefaultProfilePicIfNotGiven = (bodyFieldName) => (req, res, next) => {
    if (!req.body[bodyFieldName]) {
        req.body[bodyFieldName] = config_1.DEFAULT_USER_PROFILE_PICTURE_LINK;
    }
    next();
};
exports.setDefaultProfilePicIfNotGiven = setDefaultProfilePicIfNotGiven;
//# sourceMappingURL=setDefaultProfilePicIfNotGiven.js.map