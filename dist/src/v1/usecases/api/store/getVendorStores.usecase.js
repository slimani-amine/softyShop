"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVendorStoresUseCase = exports.getVendorStoresUseCaseBase = void 0;
const store_repository_1 = require("../../../data/repositories/store.repository");
const users_repository_1 = require("../../../data/repositories/users.repository");
const getVendorStoresUseCaseBase = (dependencies) => async (queryParams) => {
    const vendor = (await users_repository_1.usersRepo.findOne({
        where: { id: parseInt(queryParams.userId, 10) },
    }));
    const storesFound = await dependencies.storeRepo.findMyStores({
        where: { user: vendor },
    });
    return storesFound;
};
exports.getVendorStoresUseCaseBase = getVendorStoresUseCaseBase;
exports.getVendorStoresUseCase = (0, exports.getVendorStoresUseCaseBase)({
    storeRepo: store_repository_1.storeRepo,
});
//# sourceMappingURL=getVendorStores.usecase.js.map