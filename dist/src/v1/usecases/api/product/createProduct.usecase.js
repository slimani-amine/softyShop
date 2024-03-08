"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductUseCase = exports.validateCreateProductPayload = exports.createProductUseCaseBase = void 0;
const createProduct_schema_1 = require("../../../presenters/schemas/product/createProduct.schema");
const product_repository_1 = require("../../../data/repositories/product.repository");
const validate_schema_1 = require("../../../utils/validation/validate.schema");
const createProductUseCaseBase = (dependencies = {
    productRepo: product_repository_1.productRepo,
}) => async (payload) => {
    validateCreateProductPayload(payload);
    const productCreated = await dependencies.productRepo.createProduct({
        name: payload.name,
        price: payload.price,
        stockNumber: payload.stockNumber,
        publishedAt: new Date(),
        availability: payload.availability,
        isPublished: payload.isPublished,
        isAccepted: payload.isAccepted,
        creator_id: payload.creator_id,
        brand_id: payload.brand_id,
        category_id: payload.category_id,
        store_id: payload.store_id,
        images: payload.images,
        discount: payload.discount,
    });
    return {
        product: productCreated,
    };
};
exports.createProductUseCaseBase = createProductUseCaseBase;
function validateCreateProductPayload(payload) {
    (0, validate_schema_1.trimAndValidateSchemaPayload)(createProduct_schema_1.default, payload);
    return payload;
}
exports.validateCreateProductPayload = validateCreateProductPayload;
exports.createProductUseCase = (0, exports.createProductUseCaseBase)({
    productRepo: product_repository_1.productRepo,
});
//# sourceMappingURL=createProduct.usecase.js.map