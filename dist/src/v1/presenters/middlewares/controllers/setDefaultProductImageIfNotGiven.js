"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDefaultProductImageIfNotGiven = void 0;
const config_1 = require("../../../../config");
const setDefaultProductImageIfNotGiven = (bodyFieldName) => (req, res, next) => {
    if (!req.body[bodyFieldName]) {
        req.body[bodyFieldName] = config_1.DEFAULT_PRODUCT_IMAGE_LINK;
    }
    next();
};
exports.setDefaultProductImageIfNotGiven = setDefaultProductImageIfNotGiven;
//# sourceMappingURL=setDefaultProductImageIfNotGiven.js.map