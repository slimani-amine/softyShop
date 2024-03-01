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
import { getProductBrandsController } from "../../../controllers/api/brands/getProductBrands.controller";
import { deleteBrandController } from "../../../controllers/api/brands/deleteBrand.controller";
import { updateBrandController } from "../../../controllers/api/brands/updateBrand.controller";

const router = express.Router();

const defaults = {
  createStore: createStoreController,
  getStore: getAllStoresController,
  deleteStore: deleteStoresController,
  getOneStore: getOneStoreController,
  getVendorStores: getVendorStoresController,
  updateStore: updateStoreController,
  creatBrand: createBrandController,
  getProductBrands: getProductBrandsController,
  deleteBrand: deleteBrandController,
  updateBrand: updateBrandController,
};

export function getStoresApiRouter(
  controllers: {
    createStore: ControllerType;
    getStore: ControllerType;
    deleteStore: ControllerType;
    getOneStore: ControllerType;
    getVendorStores: ControllerType;
    updateStore: ControllerType;
    creatBrand: ControllerType;
    getProductBrands: ControllerType;
    deleteBrand: ControllerType;
    updateBrand: ControllerType;
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

  router.route("/:id/product"); // get all product / post a product (only for vendor)

  router.route("/:id/product/:id"); // get one product / delete a product (only for vendor) / update a product (only for admin or vendor)

  router.use(restrictToMiddleware("admin", "vendor"));

  router
    .route("/:id/product/:id/brand")
    .post(controllers.creatBrand) // post brand (only for admin or vendor)
    .get(controllers.getProductBrands); // get all brands (only for admin or vendor)

  router
    .route("/:id/product/:id/brand/:brandId")
    .delete(controllers.deleteBrand) // delete a brand (only for vendor)
    .patch(controllers.updateBrand); // update a brand (only for admin or vendor)

  router.route("/:id/product/:id/productCreator"); // post productCreator (only for vendor) / get all productCreators (only for admin or vendor)

  router.route("/:id/product/:id/productCreator/:productCreatorId"); // delete a productCreator (only for vendor) / update a productCreator (only for admin or vendor)

  return router;
}
