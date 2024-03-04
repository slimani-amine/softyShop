"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoreBrandsController = exports.getStoreBrandsControllerBase = void 0;
const getStoreBrands_usecase_1 = require("../../../../usecases/api/brands/getStoreBrands.usecase");
const getStoreBrandsControllerBase = (getStoreBrandsUseCase) => async (req, res, next) => {
    const storeId = req.params.id;
    try {
        const result = await getStoreBrandsUseCase({ storeId });
        res.status(200).send({
            message: "Success",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getStoreBrandsControllerBase = getStoreBrandsControllerBase;
exports.getStoreBrandsController = (0, exports.getStoreBrandsControllerBase)(getStoreBrands_usecase_1.getStoreBrandsUseCase);
//# sourceMappingURL=getStoreBrands.controller.js.map