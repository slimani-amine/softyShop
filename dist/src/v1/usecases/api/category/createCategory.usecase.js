"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategoryUseCase = exports.validateCreateCategoryPayload = exports.createCategoryUseCaseBase = void 0;
const exceptions_1 = require("../../../core/errors/exceptions");
const category_repository_1 = require("../../../data/repositories/category.repository");
const createCategory_schema_1 = require("../../../presenters/schemas/category/createCategory.schema");
const validate_schema_1 = require("../../../utils/validation/validate.schema");
const createCategoryUseCaseBase = (dependencies = {
    categoryRepo: category_repository_1.categoryRepo,
}) => async (payload) => {
    const categoryFound = await dependencies.categoryRepo.findAll({
        where: [{ name: payload.name }],
    });
    if (categoryFound.length > 0) {
        exceptions_1.exceptionService.badRequestException({
            message: "A category with the given name already exists",
        });
    }
    validateCreateCategoryPayload(payload);
    const categoryCreated = await dependencies.categoryRepo.createCategory({
        name: payload.name,
        icon: payload.icon,
    });
    return {
        category: categoryCreated,
    };
};
exports.createCategoryUseCaseBase = createCategoryUseCaseBase;
function validateCreateCategoryPayload(payload) {
    (0, validate_schema_1.trimAndValidateSchemaPayload)(createCategory_schema_1.default, payload);
    return payload;
}
exports.validateCreateCategoryPayload = validateCreateCategoryPayload;
exports.createCategoryUseCase = (0, exports.createCategoryUseCaseBase)({
    categoryRepo: category_repository_1.categoryRepo,
});
//# sourceMappingURL=createCategory.usecase.js.map