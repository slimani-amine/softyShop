"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBrandController = exports.deleteBrandControllerBase = void 0;
const deleteBrand_usecase_1 = require("../../../../usecases/api/brands/deleteBrand.usecase");
const deleteBrandControllerBase = (deleteBrandUseCase) => async (req, res, next) => {
    try {
        const result = await deleteBrandUseCase(req === null || req === void 0 ? void 0 : req.params);
        res.status(200).send({
            message: "Success",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteBrandControllerBase = deleteBrandControllerBase;
exports.deleteBrandController = (0, exports.deleteBrandControllerBase)(deleteBrand_usecase_1.deleteBrandUseCase);
//# sourceMappingURL=deleteBrand.controller.js.map