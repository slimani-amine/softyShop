"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductController = exports.createProductControllerBase = void 0;
const createProduct_usecase_1 = require("../../../../usecases/api/product/createProduct.usecase");
const getVendorStores_usecase_1 = require("../../../../usecases/api/store/getVendorStores.usecase");
const exceptions_1 = require("../../../../core/errors/exceptions");
const createProductControllerBase = (createProductUseCase) => async (req, res, next) => {
    try {
        const userId = req.user.id;
        const myStores = await (0, getVendorStores_usecase_1.getVendorStoresUseCase)({ userId });
        if (!myStores.length) {
            exceptions_1.exceptionService.unauthorizedException({
                message: "Invalid vendor store add a store first",
            });
        }
        req.body.store_id = req.params.id;
        const result = await createProductUseCase(req === null || req === void 0 ? void 0 : req.body);
        return res.status(201).json({
            message: "Product added successfully",
            data: {
                product: result.product,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createProductControllerBase = createProductControllerBase;
const createProductController = createProductControllerBase(createProduct_usecase_1.createProductUseCase);
exports.createProductController = createProductController;
//# sourceMappingURL=createProduct.controller.js.map