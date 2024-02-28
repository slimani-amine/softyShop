"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferFilePathToBodyMiddlewareBuilder = exports.FilePathTypes = void 0;
const config_1 = require("../../../../config");
var FilePathTypes;
(function (FilePathTypes) {
    FilePathTypes["IMAGES"] = "images";
})(FilePathTypes || (exports.FilePathTypes = FilePathTypes = {}));
const transferFilePathToBodyMiddlewareBuilder = (bodyFieldName, fileType = FilePathTypes.IMAGES) => (req, res, next) => {
    var _a;
    if (req === null || req === void 0 ? void 0 : req.file) {
        req.body[bodyFieldName] = config_1.API_BASE_URL + '/' + fileType + '/' + ((_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename);
    }
    next();
};
exports.transferFilePathToBodyMiddlewareBuilder = transferFilePathToBodyMiddlewareBuilder;
//# sourceMappingURL=transferFilePathToBody.middleware.js.map