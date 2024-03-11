"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoresApiRouter = void 0;
const express = require("express");
const createBrand_controller_1 = require("../../../controllers/api/brands/createBrand.controller");
const createStore_controller_1 = require("../../../controllers/api/stores/createStore.controller");
const deleteStore_controller_1 = require("../../../controllers/api/stores/deleteStore.controller");
const getAllStores_controller_1 = require("../../../controllers/api/stores/getAllStores.controller");
const getOneStore_controller_1 = require("../../../controllers/api/stores/getOneStore.controller");
const validateSchema_middleware_1 = require("../../../middlewares/schemas/validateSchema.middleware");
const createStore_schema_1 = require("../../../schemas/store/createStore.schema");
const restrictTo_middleware_1 = require("../../../middlewares/auth/restrictTo.middleware");
const isAuthenticated_middleware_1 = require("../../../middlewares/auth/isAuthenticated.middleware");
const getVendorStores_controller_1 = require("../../../controllers/api/stores/getVendorStores.controller");
const updateStore_controller_1 = require("../../../controllers/api/stores/updateStore.controller");
const getStoreBrands_controller_1 = require("../../../controllers/api/brands/getStoreBrands.controller");
const deleteBrand_controller_1 = require("../../../controllers/api/brands/deleteBrand.controller");
const updateBrand_controller_1 = require("../../../controllers/api/brands/updateBrand.controller");
const createProductCreator_controller_1 = require("../../../controllers/api/productCreator/createProductCreator.controller");
const deleteProductCreator_controller_1 = require("../../../controllers/api/productCreator/deleteProductCreator.controller");
const updateProductCreator__controller_1 = require("../../../controllers/api/productCreator/updateProductCreator..controller");
const getStoreProductCreators_controller_1 = require("../../../controllers/api/productCreator/getStoreProductCreators.controller");
const createProduct_controller_1 = require("../../../controllers/api/product/createProduct.controller");
const deleteProduct_controller_1 = require("../../../controllers/api/product/deleteProduct.controller");
const getStoreProducts_controller_1 = require("../../../controllers/api/product/getStoreProducts.controller");
const getOneProducts_controller_1 = require("../../../controllers/api/product/getOneProducts.controller");
const getAllProducts_controller_1 = require("../../../controllers/api/product/getAllProducts.controller");
const updateProduct_controller_1 = require("../../../controllers/api/product/updateProduct.controller");
const myStore_middleware_1 = require("../../../middlewares/controllers/myStore.middleware");
const multerUpload_middleware_1 = require("../../../middlewares/uploads/multerUpload.middleware");
const transferFilePathToBody_middleware_1 = require("../../../middlewares/uploads/transferFilePathToBody.middleware");
const setDefaultProductImageIfNotGiven_1 = require("../../../middlewares/controllers/setDefaultProductImageIfNotGiven");
const updateStore_schema_1 = require("../../../schemas/store/updateStore.schema");
const publishStore_controller_1 = require("../../../controllers/api/stores/publishStore.controller");
const publish_schema_1 = require("../../../schemas/store/publish.schema");
const router = express.Router();
const defaults = {
    createStore: createStore_controller_1.createStoreController,
    getStore: getAllStores_controller_1.getAllStoresController,
    deleteStore: deleteStore_controller_1.deleteStoresController,
    getOneStore: getOneStore_controller_1.getOneStoreController,
    getVendorStores: getVendorStores_controller_1.getVendorStoresController,
    updateStore: updateStore_controller_1.updateStoreController,
    publishStore: publishStore_controller_1.publishStoreController,
    createProduct: createProduct_controller_1.createProductController,
    getAllProducts: getAllProducts_controller_1.getAllProductsController,
    getStoreProduct: getStoreProducts_controller_1.getStoreProductsController,
    getOneProduct: getOneProducts_controller_1.getOneProductController,
    deleteProduct: deleteProduct_controller_1.deleteProductController,
    updateProduct: updateProduct_controller_1.updateProductController,
    createBrand: createBrand_controller_1.createBrandController,
    getStoreBrands: getStoreBrands_controller_1.getStoreBrandsController,
    deleteBrand: deleteBrand_controller_1.deleteBrandController,
    updateBrand: updateBrand_controller_1.updateBrandController,
    createProductCreator: createProductCreator_controller_1.createProductCreatorController,
    getStoreProductCreators: getStoreProductCreators_controller_1.getStoreProductCreatorController,
    deleteProductCreator: deleteProductCreator_controller_1.deleteProductCreatorController,
    updateProductCreator: updateProductCreator__controller_1.updateProductCreatorController,
};
function getStoresApiRouter(controllers = defaults) {
    router.use(isAuthenticated_middleware_1.isAuthentictedMiddleware);
    router
        .route("/")
        .get((0, restrictTo_middleware_1.restrictToMiddleware)("admin", "user"), controllers.getStore)
        .post((0, validateSchema_middleware_1.validateSchemaMiddleware)(createStore_schema_1.default, validateSchema_middleware_1.VALIDATION_PATHS.BODY), (0, restrictTo_middleware_1.restrictToMiddleware)("admin", "vendor"), multerUpload_middleware_1.multerImageUpload.single("picture"), (0, transferFilePathToBody_middleware_1.transferFilePathToBodyMiddlewareBuilder)("picture", transferFilePathToBody_middleware_1.FilePathTypes.IMAGES), controllers.createStore);
    router
        .route("/my-stores")
        .get((0, restrictTo_middleware_1.restrictToMiddleware)("vendor", "admin"), controllers.getVendorStores);
    router
        .route("/:id")
        .delete((0, restrictTo_middleware_1.restrictToMiddleware)("admin", "vendor"), controllers.deleteStore)
        .get(myStore_middleware_1.myStoreMiddleware, controllers.getOneStore)
        .patch((0, restrictTo_middleware_1.restrictToMiddleware)("admin", "vendor"), (0, validateSchema_middleware_1.validateSchemaMiddleware)(updateStore_schema_1.default, validateSchema_middleware_1.VALIDATION_PATHS.BODY), controllers.updateStore);
    router
        .route("/:id/publish")
        .patch((0, restrictTo_middleware_1.restrictToMiddleware)("admin"), (0, validateSchema_middleware_1.validateSchemaMiddleware)(publish_schema_1.default, validateSchema_middleware_1.VALIDATION_PATHS.BODY), controllers.publishStore);
    router
        .route("/:id/products")
        .post((0, restrictTo_middleware_1.restrictToMiddleware)("vendor", "admin"), multerUpload_middleware_1.multerImageUpload.array("images"), (0, transferFilePathToBody_middleware_1.transferFilePathToBodyMiddlewareBuilder)("images", transferFilePathToBody_middleware_1.FilePathTypes.IMAGES), (0, setDefaultProductImageIfNotGiven_1.setDefaultProductImageIfNotGiven)("images"), myStore_middleware_1.myStoreMiddleware, controllers.createProduct)
        .get(myStore_middleware_1.myStoreMiddleware, controllers.getStoreProduct);
    router
        .route("/:id/products/:productId")
        .delete((0, restrictTo_middleware_1.restrictToMiddleware)("vendor"), myStore_middleware_1.myStoreMiddleware, controllers.deleteProduct)
        .get(controllers.getOneProduct)
        .patch((0, restrictTo_middleware_1.restrictToMiddleware)("admin", "vendor"), myStore_middleware_1.myStoreMiddleware, controllers.updateProduct);
    router
        .route("/:id/brands")
        .post((0, restrictTo_middleware_1.restrictToMiddleware)("vendor"), multerUpload_middleware_1.multerImageUpload.single("picture"), (0, transferFilePathToBody_middleware_1.transferFilePathToBodyMiddlewareBuilder)("picture", transferFilePathToBody_middleware_1.FilePathTypes.IMAGES), controllers.createBrand)
        .get(controllers.getStoreBrands);
    router
        .route("/:id/brands/:brandId")
        .delete((0, restrictTo_middleware_1.restrictToMiddleware)("vendor"), controllers.deleteBrand)
        .patch((0, restrictTo_middleware_1.restrictToMiddleware)("vendor", "admin"), controllers.updateBrand);
    router
        .route("/:id/productCreators")
        .post((0, restrictTo_middleware_1.restrictToMiddleware)("vendor"), controllers.createProductCreator)
        .get(controllers.getStoreProductCreators);
    router
        .route("/:id/productCreators/:productCreatorId")
        .delete((0, restrictTo_middleware_1.restrictToMiddleware)("vendor"), controllers.deleteProductCreator)
        .patch((0, restrictTo_middleware_1.restrictToMiddleware)("vendor", "admin"), controllers.updateProductCreator);
    return router;
}
exports.getStoresApiRouter = getStoresApiRouter;
//# sourceMappingURL=index.js.map