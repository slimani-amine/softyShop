import * as express from "express";
import { ControllerType } from "../../../../../types/controller";
import { createBrandController } from "../../../controllers/api/brands/createBrand.controller";
import { createStoreController } from "../../../controllers/api/store/createStore.controller";
import { deleteStoresController } from "../../../controllers/api/store/deleteStore.controller";
import { getAllStoresController } from "../../../controllers/api/store/getAllStores.controller";
import { getOneStoreController } from "../../../controllers/api/store/getOneStore.controller";
import {
  VALIDATION_PATHS,
  validateSchemaMiddleware,
} from "../../../middlewares/schemas/validateSchema.middleware";
import createStoreSchema from "../../../schemas/store/createStore.schema";
import { restrictToMiddleware } from "../../../middlewares/auth/restrictTo.middleware";
import { isAuthentictedMiddleware } from "../../../middlewares/auth/isAuthenticated.middleware";
import { getVendorStoresController } from "../../../controllers/api/store/getVendorStores.controller";
import { updateStoreController } from "../../../controllers/api/store/updateStore.controller";
import { getStoreBrandsController } from "../../../controllers/api/brands/getStoreBrands.controller";
import { deleteBrandController } from "../../../controllers/api/brands/deleteBrand.controller";
import { updateBrandController } from "../../../controllers/api/brands/updateBrand.controller";
import { createProductCreatorController } from "../../../controllers/api/productCreator/createProductCreator.controller";
import { deleteProductCreatorController } from "../../../controllers/api/productCreator/deleteProductCreator.controller";
import { updateProductCreatorController } from "../../../controllers/api/productCreator/updateProductCreator..controller";
import { getStoreProductCreatorController } from "../../../controllers/api/productCreator/getStoreProductCreators.controller";
import { createProductController } from "../../../controllers/api/product/createProduct.controller";

const router = express.Router();

const defaults = {
  createStore: createStoreController,
  getStore: getAllStoresController,
  deleteStore: deleteStoresController,
  getOneStore: getOneStoreController,
  getVendorStores: getVendorStoresController,
  updateStore: updateStoreController,
  createProduct: createProductController,
  createBrand: createBrandController,
  getStoreBrands: getStoreBrandsController,
  deleteBrand: deleteBrandController,
  updateBrand: updateBrandController,
  createProductCreator: createProductCreatorController,
  getStoreProductCreators: getStoreProductCreatorController,
  deleteProductCreator: deleteProductCreatorController,
  updateProductCreator: updateProductCreatorController,
};

export function getStoresApiRouter(
  controllers: {
    createStore: ControllerType;
    getStore: ControllerType;
    deleteStore: ControllerType;
    getOneStore: ControllerType;
    getVendorStores: ControllerType;
    updateStore: ControllerType;
    createProduct: ControllerType;
    createBrand: ControllerType;
    getStoreBrands: ControllerType;
    deleteBrand: ControllerType;
    updateBrand: ControllerType;
    createProductCreator: ControllerType;
    getStoreProductCreators: ControllerType;
    deleteProductCreator: ControllerType;
    updateProductCreator: ControllerType;
  } = defaults
) {
  router.use(isAuthentictedMiddleware);

  router
    .route("/")
    .get(restrictToMiddleware("admin", "user"), controllers.getStore) // get all stores
    .post(
      validateSchemaMiddleware(createStoreSchema, VALIDATION_PATHS.BODY),
      restrictToMiddleware("admin", "vendor"),
      controllers.createStore
    ); // create a new store (only for admin or vendors)
  router
    .route("/my-stores")
    .get(restrictToMiddleware("vendor", "admin"), controllers.getVendorStores); // get vendor stores (only for admin or vendors)

  router.use(restrictToMiddleware("admin", "vendor"));
  router
    .route("/:id")
    .delete(controllers.deleteStore) // delete a store
    .get(controllers.getOneStore) // get one store
    .patch(controllers.updateStore); // update a store

  router.route("/:id/products"); //get all products of the store

  router
    .route("/:id/product")
    .post(restrictToMiddleware("vendor", "admin"), controllers.createProduct); // get all product / post a product (only for vendor)

  router.route("/:id/product/:profuctId"); // get one product / delete a product (only for vendor) / update a product (only for admin or vendor)

  router.use(restrictToMiddleware("admin", "vendor"));

  router
    .route("/:id/brand")
    .post(controllers.createBrand) // post brand (only for admin or vendor)
    .get(controllers.getStoreBrands); // get all brands (only for admin or vendor)

  router
    .route("/:id/brand/:brandId")
    .delete(controllers.deleteBrand) // delete a brand (only for vendor)
    .patch(controllers.updateBrand); // update a brand (only for admin or vendor)

  router
    .route("/:id/productCreator")
    .post(controllers.createProductCreator) // post productCreator (only for vendor)
    .get(controllers.getStoreProductCreators); // get all productCreators (only for admin or vendor)

  router
    .route("/:id/productCreator/:productCreatorId")
    .delete(controllers.deleteProductCreator) // delete a productCreator (only for vendor)
    .patch(controllers.updateProductCreator); //  update a productCreator (only for admin or vendor)

  return router;
}
