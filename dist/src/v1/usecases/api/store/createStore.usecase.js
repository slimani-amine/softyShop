"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStoreUseCase = exports.validatecreateStorePayload = exports.createStoreUseCaseBase = void 0;
const exceptions_1 = require("../../../core/errors/exceptions");
const store_reposotory_1 = require("../../../data/repositories/store.reposotory");
const createStore_schema_1 = require("../../../presenters/schemas/store/createStore.schema");
const validate_schema_1 = require("../../../utils/validation/validate.schema");
const createStoreUseCaseBase = (dependencies = {
    storeRepo: store_reposotory_1.storeRepo,
}) => async (payload) => {
    const storeFound = await dependencies.storeRepo.findAll({
        where: [{ storeName: payload.storeName }],
    });
    console.log("🚀 ~ storeFound:", storeFound);
    if (storeFound.length > 0) {
        exceptions_1.exceptionService.badRequestException({
            message: "A store With The Given Name Already Exists",
        });
    }
    validatecreateStorePayload(payload);
    const storeCreated = await dependencies.storeRepo.createStore({
        storeName: payload.storeName,
        storePhone: payload.storePhone,
        logo: payload.logo,
        foundedAt: payload.foundedAt,
        isPublished: payload.isPublished,
        position: payload.position,
        socialMediaLinks: payload.socialMediaLinks,
        vendor_id: payload.vendor_id,
    });
    return {
        store: storeCreated,
    };
};
exports.createStoreUseCaseBase = createStoreUseCaseBase;
function validatecreateStorePayload(payload) {
    (0, validate_schema_1.trimAndValidateSchemaPayload)(createStore_schema_1.default, payload);
    return payload;
}
exports.validatecreateStorePayload = validatecreateStorePayload;
exports.createStoreUseCase = (0, exports.createStoreUseCaseBase)({
    storeRepo: store_reposotory_1.storeRepo,
});
//# sourceMappingURL=createStore.usecase.js.map