"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBrandUseCase = exports.validateCreateBrandPayload = exports.createBrandUseCaseBase = void 0;
const exceptions_1 = require("../../../core/errors/exceptions");
const validate_schema_1 = require("../../../utils/validation/validate.schema");
const brand_repository_1 = require("../../../data/repositories/brand.repository");
const createBrand_schema_1 = require("../../../presenters/schemas/brands/createBrand.schema");
const createBrandUseCaseBase = (dependencies = {
    brandRepo: brand_repository_1.brandRepo,
}) => async (payload) => {
    console.log("🚀 ~ payload:", payload);
    const brandFound = await dependencies.brandRepo.findAll({
        where: [{ name: payload.name }],
    });
    if (brandFound.length > 0) {
        exceptions_1.exceptionService.badRequestException({
            message: "A brand with the given name already exists",
        });
    }
    validateCreateBrandPayload(payload);
    const brandCreated = await dependencies.brandRepo.createBrand({
        name: payload.name,
        logo: payload.logo,
        store_id: payload.store_id,
    });
    return {
        brand: brandCreated,
    };
};
exports.createBrandUseCaseBase = createBrandUseCaseBase;
function validateCreateBrandPayload(payload) {
    (0, validate_schema_1.trimAndValidateSchemaPayload)(createBrand_schema_1.default, payload);
    return payload;
}
exports.validateCreateBrandPayload = validateCreateBrandPayload;
exports.createBrandUseCase = (0, exports.createBrandUseCaseBase)({
    brandRepo: brand_repository_1.brandRepo,
});
//# sourceMappingURL=createBrand.usecase.js.map