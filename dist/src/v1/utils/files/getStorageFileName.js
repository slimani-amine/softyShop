"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStorageFileName = void 0;
const getStorageFileName = (file) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split('.')[file.originalname.split('.').length - 1];
    return uniqueSuffix + '.' + extension;
};
exports.getStorageFileName = getStorageFileName;
//# sourceMappingURL=getStorageFileName.js.map