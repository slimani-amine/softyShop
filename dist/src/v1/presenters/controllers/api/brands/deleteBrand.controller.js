"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBrandsController = exports.deleteBrandsControllerBase = void 0;
const deleteBrand_usecase_1 = require("../../../../usecases/api/brands/deleteBrand.usecase");
const deleteBrandsControllerBase = (deleteBrandUseCase) => async (req, res, next) => {
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
exports.deleteBrandsControllerBase = deleteBrandsControllerBase;
exports.deleteBrandsController = (0, exports.deleteBrandsControllerBase)(deleteBrand_usecase_1.deleteBrandUseCase);
//# sourceMappingURL=deleteBrand.controller.js.map