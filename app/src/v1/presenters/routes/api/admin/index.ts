import * as express from "express";
import { ControllerType } from "../../../../../types/controller";
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
import { createCategoryController } from "../../../controllers/api/category/createCategory.controller";
import { deleteCategoryController } from "../../../controllers/api/category/deleteCategory.controller";
import { getAllCategoryController } from "../../../controllers/api/category/getAllCategories.controller";
import { updatecategoryController } from "../../../controllers/api/category/updateCategory.controller";

const router = express.Router();

const defaults = {
  createStore: createStoreController,
  getStore: getAllStoresController,
  deleteStore: deleteStoresController,
  getOneStore: getOneStoreController,
  getVendorStores: getVendorStoresController,
  updateStore: updateStoreController,
  createCategory: createCategoryController,
  deleteCategory: deleteCategoryController,
  getCategories: getAllCategoryController,
  updateCategory: updatecategoryController,
};

export function getStoresApiRouter(
  controllers: {
    createStore: ControllerType;
    getStore: ControllerType;
    deleteStore: ControllerType;
    getOneStore: ControllerType;
    getVendorStores: ControllerType;
    updateStore: ControllerType;
    createCategory: ControllerType;
    deleteCategory: ControllerType;
    getCategories: ControllerType;
    updateCategory: ControllerType;
  } = defaults
) {
  router.use(isAuthentictedMiddleware);

  router
    .route("/store")
    .get(restrictToMiddleware("admin", "user"), controllers.getStore)
    .post(
      validateSchemaMiddleware(createStoreSchema, VALIDATION_PATHS.BODY),
      restrictToMiddleware("admin", "vendor"),
      controllers.createStore
    );
  router
    .route("/my-stores")
    .get(restrictToMiddleware("vendor", "admin"), controllers.getVendorStores);

  router.use(restrictToMiddleware("admin", "vendor"));
  router
    .route("/store/:id")
    .delete(controllers.deleteStore)
    .get(controllers.getOneStore)
    .patch(controllers.updateStore);

  router
    .route("/category")
    .post(restrictToMiddleware("admin"), controllers.createCategory)
    .get(restrictToMiddleware("admin", "vendor"), controllers.getCategories);

  router
    .route("/category/:id")
    .patch(restrictToMiddleware("admin"), controllers.updateCategory)
    .delete(restrictToMiddleware("admin"), controllers.deleteCategory);

  return router;
}
