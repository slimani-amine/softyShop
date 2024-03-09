import * as express from "express";
import { ControllerType } from "../../../../../types/controller";
import { isAuthentictedMiddleware } from "../../../middlewares/auth/isAuthenticated.middleware";
import { getAllProductsController } from "../../../controllers/api/product/getAllProducts.controller";
import { createReviewController } from "../../../controllers/api/review/createReview.controller";
import { deleteReviewController } from "../../../controllers/api/review/deleteReview.controller";
import { getAllProductReviewsController } from "../../../controllers/api/review/getAllProductReviews.controller";
import { restrictToMiddleware } from "../../../middlewares/auth/restrictTo.middleware";
import { updateReviewController } from "../../../controllers/api/review/updateReview.controller";

const router = express.Router();

const defaults = {
  getAllProducts: getAllProductsController,
  addReview: createReviewController,
  productReviews: getAllProductReviewsController,
  deleteReview: deleteReviewController,
  updateReview: updateReviewController,
};

export function getProductsApiRouter(
  controllers: {
    getAllProducts: ControllerType;
    productReviews: ControllerType;
    addReview: ControllerType;
    deleteReview: ControllerType;
    updateReview: ControllerType;
  } = defaults
) {
  router.use(isAuthentictedMiddleware);

  router.route("/").get(controllers.getAllProducts); //get all products

  router.route("/:id/reviews").get(controllers.productReviews); //get the product reviews

  router
    .route("/reviews")
    .post(restrictToMiddleware("user"), controllers.addReview); //create a new review

  router
    .route("/reviews/:id")
    .delete(controllers.deleteReview) //delete review
    .patch(controllers.updateReview); //update review

  return router;
}
