"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBrandUseCase = exports.validateCreateBrandPayload = exports.createBrandUseCaseBase = void 0;
const validate_schema_1 = require("../../../utils/validation/validate.schema");
const brand_repository_1 = require("../../../data/repositories/brand.repository");
const createBrand_schema_1 = require("../../../presenters/schemas/brands/createBrand.schema");
const createBrandUseCaseBase = (dependencies = {
    brandRepo: brand_repository_1.brandRepo,
}) => async (payload) => {
    validateCreateBrandPayload(payload);
    const brandCreated = await dependencies.brandRepo.createBrand({
        name: payload.name,
        logo: payload.logo,
        product_id: payload.product_id,
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