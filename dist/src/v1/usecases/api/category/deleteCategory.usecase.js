"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStoreUseCase = exports.deleteStoreUseCaseBase = void 0;
const exceptions_1 = require("../../../core/errors/exceptions");
const store_repository_1 = require("../../../data/repositories/store.repository");
const deleteStoreUseCaseBase = (dependencies) => async (queryParams) => {
    const store = await dependencies.storeRepo.findOne({
        where: { id: queryParams.id },
    });
    if (!store) {
        exceptions_1.exceptionService.notFoundException({
            message: "Store not found",
        });
    }
    const storesFound = await dependencies.storeRepo.deleteStore(store);
    return storesFound;
};
exports.deleteStoreUseCaseBase = deleteStoreUseCaseBase;
exports.deleteStoreUseCase = (0, exports.deleteStoreUseCaseBase)({
    storeRepo: store_repository_1.storeRepo,
});
//# sourceMappingURL=deleteCategory.usecase.js.map