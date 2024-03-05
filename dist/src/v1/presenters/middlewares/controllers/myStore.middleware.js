"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myStoreMiddleware = void 0;
const getVendorStores_usecase_1 = require("../../../usecases/api/store/getVendorStores.usecase");
const myStoreMiddleware = async (req, res, next) => {
    const storeId = req.params.id;
    const userId = req.user.id;
    const role = req.user.role;
    try {
        const myStores = await (0, getVendorStores_usecase_1.getVendorStoresUseCase)({ userId });
        const isStoreInMyStores = myStores.some((store) => {
            return store.id == storeId;
        });
        if (!isStoreInMyStores && role !== "admin") {
            return res.status(403).json({
                message: "You do not have access to this store.",
            });
        }
        next();
    }
    catch (err) {
        throw err;
    }
};
exports.myStoreMiddleware = myStoreMiddleware;
//# sourceMappingURL=myStore.middleware.js.map