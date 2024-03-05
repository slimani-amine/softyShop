"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBrandController = exports.createBrandControllerBase = void 0;
const createBrand_usecase_1 = require("../../../../usecases/api/brands/createBrand.usecase");
const createBrandControllerBase = (createBrandUseCase) => async (req, res, next) => {
    req.body.store_id = req.params.id;
    try {
        const result = await createBrandUseCase(req === null || req === void 0 ? void 0 : req.body);
        return res.status(201).json({
            message: "Brand added successfully",
            data: {
                brand: result.brand,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createBrandControllerBase = createBrandControllerBase;
const createBrandController = createBrandControllerBase(createBrand_usecase_1.createBrandUseCase);
exports.createBrandController = createBrandController;
//# sourceMappingURL=createBrand.controller.js.map