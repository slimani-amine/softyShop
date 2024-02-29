"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMethodUseCase = exports.validateCreateMethodPayload = exports.createMethodUseCaseBase = void 0;
const exceptions_1 = require("../../../core/errors/exceptions");
const validate_schema_1 = require("../../../utils/validation/validate.schema");
const paymentMethod_repository_1 = require("../../../data/repositories/paymentMethod.repository");
const createMethod_schema_1 = require("../../../presenters/schemas/payementMethod/createMethod.schema");
const createMethodUseCaseBase = (dependencies = {
    paymentMethodRepo: paymentMethod_repository_1.paymentMethodRepo,
}) => async (payload) => {
    const methodFound = await dependencies.paymentMethodRepo.findAll({
        where: [{ name: payload.name }],
    });
    if (methodFound.length > 0) {
        exceptions_1.exceptionService.badRequestException({
            message: "A Method with the given name already exists",
        });
    }
    validateCreateMethodPayload(payload);
    const methodCreated = await dependencies.paymentMethodRepo.createPaymentMethod({
        name: payload.name,
        icon: payload.icon,
    });
    return {
        method: methodCreated,
    };
};
exports.createMethodUseCaseBase = createMethodUseCaseBase;
function validateCreateMethodPayload(payload) {
    (0, validate_schema_1.trimAndValidateSchemaPayload)(createMethod_schema_1.default, payload);
    return payload;
}
exports.validateCreateMethodPayload = validateCreateMethodPayload;
exports.createMethodUseCase = (0, exports.createMethodUseCaseBase)({
    paymentMethodRepo: paymentMethod_repository_1.paymentMethodRepo,
});
//# sourceMappingURL=createMethod.usecase.js.map