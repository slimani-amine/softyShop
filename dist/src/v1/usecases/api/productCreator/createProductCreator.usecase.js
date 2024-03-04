"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductCreatorUseCase = exports.validateCreateProductCreatorPayload = exports.createProductCreatorUseCaseBase = void 0;
const exceptions_1 = require("../../../core/errors/exceptions");
const validate_schema_1 = require("../../../utils/validation/validate.schema");
const productCreator_repository_1 = require("../../../data/repositories/productCreator.repository");
const createProductCreator_schema_1 = require("../../../presenters/schemas/productCreator/createProductCreator.schema");
const createProductCreatorUseCaseBase = (dependencies = {
    productCreatorRepo: productCreator_repository_1.productCreatorRepo,
}) => async (payload) => {
    const productCreatorFound = await dependencies.productCreatorRepo.findAll({
        where: [{ name: payload.name }],
    });
    if (productCreatorFound.length > 0) {
        exceptions_1.exceptionService.badRequestException({
            message: "A product Creator with the given name already exists",
        });
    }
    validateCreateProductCreatorPayload(payload);
    const productCreatorCreated = await dependencies.productCreatorRepo.createProductCreator({
        name: payload.name,
        store_id: payload.store_id,
    });
    return {
        productCreator: productCreatorCreated,
    };
};
exports.createProductCreatorUseCaseBase = createProductCreatorUseCaseBase;
function validateCreateProductCreatorPayload(payload) {
    (0, validate_schema_1.trimAndValidateSchemaPayload)(createProductCreator_schema_1.default, payload);
    return payload;
}
exports.validateCreateProductCreatorPayload = validateCreateProductCreatorPayload;
exports.createProductCreatorUseCase = (0, exports.createProductCreatorUseCaseBase)({
    productCreatorRepo: productCreator_repository_1.productCreatorRepo,
});
//# sourceMappingURL=createProductCreator.usecase.js.map