"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductBrandsController = exports.getProductBrandsControllerBase = void 0;
const getProductBrands_usecase_1 = require("../../../../usecases/api/brands/getProductBrands.usecase");
const getProductBrandsControllerBase = (getProductBrandsUseCase) => async (req, res, next) => {
    const { storeId, productId } = req.params;
    try {
        const result = await getProductBrandsUseCase({ storeId, productId });
        res.status(200).send({
            message: "Success",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getProductBrandsControllerBase = getProductBrandsControllerBase;
exports.getProductBrandsController = (0, exports.getProductBrandsControllerBase)(getProductBrands_usecase_1.getProductBrandsUseCase);
//# sourceMappingURL=getProductBrands.controller.js.map