import * as express from "express";
import { ControllerType } from "../../../../../types/controller";
import { isAuthentictedMiddleware } from "../../../middlewares/auth/isAuthenticated.middleware";
import { getAllProductsController } from "../../../controllers/api/product/getAllProducts.controller";
import { createReviewController } from "../../../controllers/api/review/createReview.controller";
import { deleteReviewController } from "../../../controllers/api/review/deleteReview.controller";
import { getAllProductReviewsController } from "../../../controllers/api/review/getAllProductReviews.controller";

const router = express.Router();

const defaults = {
  getAllProducts: getAllProductsController,
  addReview: createReviewController,
  productReviews: getAllProductReviewsController,
  deleteReview: deleteReviewController,
};

export function getProductsApiRouter(
  controllers: {
    getAllProducts: ControllerType;
    productReviews: ControllerType;
    addReview: ControllerType;
    deleteReview: ControllerType;
  } = defaults
) {
  router.use(isAuthentictedMiddleware);

  router.route("/").get(controllers.getAllProducts); //get all products

  router.route("/:id/review").get(controllers.productReviews); //get the product reviews

  router.route("/review").post(controllers.addReview); //create a new review

  router.route("/review/:id").delete(controllers.deleteReview); //delete review

  return router;
}
