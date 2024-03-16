import * as express from "express";
import { ControllerType } from "../../../../../types/controller";
import { restrictToMiddleware } from "../../../middlewares/auth/restrictTo.middleware";
import { isAuthentictedMiddleware } from "../../../middlewares/auth/isAuthenticated.middleware";
import { createCategoryController } from "../../../controllers/api/category/createCategory.controller";
import { deleteCategoryController } from "../../../controllers/api/category/deleteCategory.controller";
import { getAllCategoryController } from "../../../controllers/api/category/getAllCategories.controller";
import { updatecategoryController } from "../../../controllers/api/category/updateCategory.controller";
import { createMethodController } from "../../../controllers/api/paymentMethod/createMethod.controller";
import { deletePayementMethodController } from "../../../controllers/api/paymentMethod/deleteMethod.controller";
import { getAllPayementMethodsController } from "../../../controllers/api/paymentMethod/getAllMethods.controller";
import { updatepaymentMethodController } from "../../../controllers/api/paymentMethod/updateMethod.controller";

const router = express.Router();

const defaults = {
  createCategory: createCategoryController,
  deleteCategory: deleteCategoryController,
  getCategories: getAllCategoryController,
  updateCategory: updatecategoryController,
  createPaymentMethod: createMethodController,
  deletePaymentMethod: deletePayementMethodController,
  updatePaymentMethod: updatepaymentMethodController,
  getPaymentMethods: getAllPayementMethodsController,
};

export function getAdminApiRouter(
  controllers: {
    createCategory: ControllerType;
    deleteCategory: ControllerType;
    getCategories: ControllerType;
    updateCategory: ControllerType;
    createPaymentMethod: ControllerType;
    deletePaymentMethod: ControllerType;
    getPaymentMethods: ControllerType;
    updatePaymentMethod: ControllerType;
  } = defaults
) {
  router.use(isAuthentictedMiddleware);

  router
    .route("/categories")
    .post(restrictToMiddleware("admin"), controllers.createCategory) // create a category (only for admin)
    .get(controllers.getCategories); // get all categories (only for admin or vendor)

  router
    .route("/categories/:categoryId")
    .patch(restrictToMiddleware("admin"), controllers.updateCategory) // update a category (only for admin)
    .delete(restrictToMiddleware("admin"), controllers.deleteCategory); // delete a category (only for admin)

  router
    .route("/payment-method")
    .post(restrictToMiddleware("admin"), controllers.createPaymentMethod) // create a payment method (only for admin)
    .get(
      restrictToMiddleware("admin", "vendor"),
      controllers.getPaymentMethods
    ); // get payment methods (only for admin or vendor)

  router
    .route("/payment-method/:id")
    .delete(restrictToMiddleware("admin"), controllers.deletePaymentMethod) // delete payment method (only for admin)
    .patch(
      restrictToMiddleware("admin", "vendor"),
      controllers.updatePaymentMethod
    ); // update payment method (only for admin or vendor)

  return router;
}
