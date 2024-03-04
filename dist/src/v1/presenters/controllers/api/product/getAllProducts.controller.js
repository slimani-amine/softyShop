"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProductsController = exports.getAllProductsControllerBase = void 0;
const getAllProducts_usecase_1 = require("../../../../usecases/api/product/getAllProducts.usecase");
const getAllProductsControllerBase = (getAllProductUseCase) => async (req, res, next) => {
    console.log("heloo");
    try {
        const result = await getAllProductUseCase(req === null || req === void 0 ? void 0 : req.query);
        res.status(200).send({
            message: 'Success',
            data: result.docs,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getAllProductsControllerBase = getAllProductsControllerBase;
exports.getAllProductsController = (0, exports.getAllProductsControllerBase)(getAllProducts_usecase_1.getAllProductUseCase);
//# sourceMappingURL=getAllProducts.controller.js.map