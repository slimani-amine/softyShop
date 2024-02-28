"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerImageUpload = void 0;
const multer = require("multer");
const multer_storages_1 = require("../../filesStorage/multer/multer.storages");
const DEFAULT_MULTER_OPTIONS = {
    limits: {
        fileSize: 15000000,
    },
};
exports.multerImageUpload = multer(Object.assign(Object.assign({}, DEFAULT_MULTER_OPTIONS), { storage: multer_storages_1.imagesStorage }));
//# sourceMappingURL=multerUpload.middleware.js.map