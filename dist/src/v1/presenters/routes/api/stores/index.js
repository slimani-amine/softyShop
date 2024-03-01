"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoresApiRouter = void 0;
const express = require("express");
const createBrand_controller_1 = require("../../../controllers/api/brands/createBrand.controller");
const createStore_controller_1 = require("../../../controllers/api/store/createStore.controller");
const deleteStore_controller_1 = require("../../../controllers/api/store/deleteStore.controller");
const getAllStores_controller_1 = require("../../../controllers/api/store/getAllStores.controller");
const getOneStore_controller_1 = require("../../../controllers/api/store/getOneStore.controller");
const validateSchema_middleware_1 = require("../../../middlewares/schemas/validateSchema.middleware");
const createStore_schema_1 = require("../../../schemas/store/createStore.schema");
const restrictTo_middleware_1 = require("../../../middlewares/auth/restrictTo.middleware");
const isAuthenticated_middleware_1 = require("../../../middlewares/auth/isAuthenticated.middleware");
const getVendorStores_controller_1 = require("../../../controllers/api/store/getVendorStores.controller");
const updateStore_controller_1 = require("../../../controllers/api/store/updateStore.controller");
const router = express.Router();
const defaults = {
    createStore: createStore_controller_1.createStoreController,
    getStore: getAllStores_controller_1.getAllStoresController,
    deleteStore: deleteStore_controller_1.deleteStoresController,
    getOneStore: getOneStore_controller_1.getOneStoreController,
    getVendorStores: getVendorStores_controller_1.getVendorStoresController,
    updateStore: updateStore_controller_1.updateStoreController,
    creatBrand: createBrand_controller_1.createBrandController,
};
function getStoresApiRouter(controllers = defaults) {
    router.use(isAuthenticated_middleware_1.isAuthentictedMiddleware);
    router
        .route("/")
        .get((0, restrictTo_middleware_1.restrictToMiddleware)("admin", "user"), controllers.getStore)
        .post((0, validateSchema_middleware_1.validateSchemaMiddleware)(createStore_schema_1.default, validateSchema_middleware_1.VALIDATION_PATHS.BODY), (0, restrictTo_middleware_1.restrictToMiddleware)("admin", "vendor"), controllers.createStore);
    router
        .route("/my-stores")
        .get((0, restrictTo_middleware_1.restrictToMiddleware)("vendor", "admin"), controllers.getVendorStores);
    router.use((0, restrictTo_middleware_1.restrictToMiddleware)("admin", "vendor"));
    router
        .route("/:id")
        .delete(controllers.deleteStore)
        .get(controllers.getOneStore)
        .patch(controllers.updateStore);
    router.route("/:id/products");
    router.route("/:id/product");
    router.route("/:id/product/:id");
    router.use((0, restrictTo_middleware_1.restrictToMiddleware)("admin", "vendor"));
    router.route("/:id/product/:id/brand");
    router.route("/:id/product/:id/brand/:brandId");
    router.route("/:id/product/:id/productCreator");
    router.route("/:id/product/:id/productCreator/:productCreatorId");
    return router;
}
exports.getStoresApiRouter = getStoresApiRouter;
//# sourceMappingURL=index.js.map