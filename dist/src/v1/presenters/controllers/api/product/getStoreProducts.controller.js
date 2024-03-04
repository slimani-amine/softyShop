"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoreProductsController = exports.getStoreProductsControllerBase = void 0;
const getStoreProducts_usecase_1 = require("../../../../usecases/api/product/getStoreProducts.usecase");
const getStoreProductsControllerBase = (getStoreProductUseCase) => async (req, res, next) => {
    const storeId = req.params.id;
    try {
        const result = await getStoreProductUseCase({ storeId });
        res.status(200).send({
            message: "success",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getStoreProductsControllerBase = getStoreProductsControllerBase;
exports.getStoreProductsController = (0, exports.getStoreProductsControllerBase)(getStoreProducts_usecase_1.getStoreProductUseCase);
//# sourceMappingURL=getStoreProducts.controller.js.map