"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagesStorage = void 0;
const config_1 = require("../../../../config");
const getStorageFileName_1 = require("../../../utils/files/getStorageFileName");
const multer = require("multer");
const path_1 = require("path");
const getMulterStorage = (destinationPath) => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, destinationPath);
        },
        filename: function (req, file, cb) {
            const newFileName = (0, getStorageFileName_1.getStorageFileName)(file);
            cb(null, newFileName);
        },
    });
};
exports.imagesStorage = getMulterStorage((0, path_1.join)(config_1.STATIC_FILES_PATH, ""));
//# sourceMappingURL=multer.storages.js.map