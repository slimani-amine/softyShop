"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAddressUseCase = exports.validateCreateAddressPayload = exports.createAddressUseCaseBase = void 0;
const exceptions_1 = require("../../../core/errors/exceptions");
const createAddress_schema_1 = require("../../../presenters/schemas/address/createAddress.schema");
const validate_schema_1 = require("../../../utils/validation/validate.schema");
const addresses_repository_1 = require("../../../data/repositories/addresses.repository");
const users_repository_1 = require("../../../data/repositories/users.repository");
const errors_1 = require("../../../domain/auth/errors");
const createAddressUseCaseBase = (dependencies = {
    addressRepo: addresses_repository_1.addressRepo,
}) => async (payload) => {
    const user = await users_repository_1.usersRepo.findOne({ where: { id: payload.user_id } });
    if (!user) {
        exceptions_1.exceptionService.notFoundException({
            message: errors_1.ACCOUNT_NOT_FOUND_ERROR_MESSAGE,
        });
    }
    validateCreateAddressPayload(payload);
    const addressCreated = await dependencies.addressRepo.createAddress({
        address: payload.address,
        city: payload.city,
        state: payload.state,
        zipCode: payload.zipCode,
        user_id: payload.user_id,
    });
    return {
        address: addressCreated,
    };
};
exports.createAddressUseCaseBase = createAddressUseCaseBase;
function validateCreateAddressPayload(payload) {
    (0, validate_schema_1.trimAndValidateSchemaPayload)(createAddress_schema_1.default, payload);
    return payload;
}
exports.validateCreateAddressPayload = validateCreateAddressPayload;
exports.createAddressUseCase = (0, exports.createAddressUseCaseBase)({
    addressRepo: addresses_repository_1.addressRepo,
});
//# sourceMappingURL=createAddresse.usecase.js.map