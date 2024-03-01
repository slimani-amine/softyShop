"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBrandController = exports.updateBrandControllerBase = void 0;
const brand_repository_1 = require("../../../../data/repositories/brand.repository");
const updateBrand_usecase_1 = require("../../../../usecases/api/brands/updateBrand.usecase");
const updateBrandControllerBase = (updateBrandUseCase) => async (req, res, next) => {
    try {
        const brandId = req.params.brandId;
        const brand = await brand_repository_1.brandRepo.findOne({ where: { id: brandId } });
        const updatePayload = req.body;
        const result = await updateBrandUseCase(brand, updatePayload);
        if (!result) {
            return res.status(404).json({
                message: "Brand not found",
            });
        }
        res.status(201).send({
            message: "Brand updated successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateBrandControllerBase = updateBrandControllerBase;
exports.updateBrandController = (0, exports.updateBrandControllerBase)(updateBrand_usecase_1.updateBrandUseCase);
//# sourceMappingURL=updateBrand.controller.js.map