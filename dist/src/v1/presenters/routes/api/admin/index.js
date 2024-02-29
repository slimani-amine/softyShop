"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoresApiRouter = void 0;
const express = require("express");
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
const createCategory_controller_1 = require("../../../controllers/api/category/createCategory.controller");
const deleteCategory_controller_1 = require("../../../controllers/api/category/deleteCategory.controller");
const getAllCategories_controller_1 = require("../../../controllers/api/category/getAllCategories.controller");
const updateCategory_controller_1 = require("../../../controllers/api/category/updateCategory.controller");
const router = express.Router();
const defaults = {
    createStore: createStore_controller_1.createStoreController,
    getStore: getAllStores_controller_1.getAllStoresController,
    deleteStore: deleteStore_controller_1.deleteStoresController,
    getOneStore: getOneStore_controller_1.getOneStoreController,
    getVendorStores: getVendorStores_controller_1.getVendorStoresController,
    updateStore: updateStore_controller_1.updateStoreController,
    createCategory: createCategory_controller_1.createCategoryController,
    deleteCategory: deleteCategory_controller_1.deleteCategoryController,
    getCategories: getAllCategories_controller_1.getAllCategoryController,
    updateCategory: updateCategory_controller_1.updatecategoryController,
};
function getStoresApiRouter(controllers = defaults) {
    router.use(isAuthenticated_middleware_1.isAuthentictedMiddleware);
    router
        .route("/store")
        .get((0, restrictTo_middleware_1.restrictToMiddleware)("admin", "user"), controllers.getStore)
        .post((0, validateSchema_middleware_1.validateSchemaMiddleware)(createStore_schema_1.default, validateSchema_middleware_1.VALIDATION_PATHS.BODY), (0, restrictTo_middleware_1.restrictToMiddleware)("admin", "vendor"), controllers.createStore);
    router
        .route("/my-stores")
        .get((0, restrictTo_middleware_1.restrictToMiddleware)("vendor", "admin"), controllers.getVendorStores);
    router.use((0, restrictTo_middleware_1.restrictToMiddleware)("admin", "vendor"));
    router
        .route("/store/:id")
        .delete(controllers.deleteStore)
        .get(controllers.getOneStore)
        .patch(controllers.updateStore);
    router
        .route("/category")
        .post((0, restrictTo_middleware_1.restrictToMiddleware)("admin"), controllers.createCategory)
        .get((0, restrictTo_middleware_1.restrictToMiddleware)("admin", "vendor"), controllers.getCategories);
    router
        .route("/category/:id")
        .patch((0, restrictTo_middleware_1.restrictToMiddleware)("admin"), controllers.updateCategory)
        .delete((0, restrictTo_middleware_1.restrictToMiddleware)("admin"), controllers.deleteCategory);
    return router;
}
exports.getStoresApiRouter = getStoresApiRouter;
//# sourceMappingURL=index.js.map