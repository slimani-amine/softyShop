import * as express from "express";
import { ControllerType } from "../../../../../types/controller";
import { restrictToMiddleware } from "../../../middlewares/auth/restrictTo.middleware";
import { isAuthentictedMiddleware } from "../../../middlewares/auth/isAuthenticated.middleware";
import { getAllProductsController } from "../../../controllers/api/product/getAllProducts.controller";

const router = express.Router();

const defaults = {
  getAllProducts: getAllProductsController,
};

export function getProductsApiRouter(
  controllers: {
    getAllProducts: ControllerType;
  } = defaults
) {
  router.use(isAuthentictedMiddleware);

  router.route("/").get(controllers.getAllProducts); //get all products

  return router;
}
