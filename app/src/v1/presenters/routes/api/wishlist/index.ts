import * as express from "express";
import { ControllerType } from "../../../../../types/controller";
import { isAuthentictedMiddleware } from "../../../middlewares/auth/isAuthenticated.middleware";
import { createWishlistController } from "../../../controllers/api/wishlist/addProductToWishlist.controller";
import { deleteWishlistController } from "../../../controllers/api/wishlist/deleteProductWishlist.controller";
import { getWishlistsByUserController } from "../../../controllers/api/wishlist/getUserWishlists.controller";

const router = express.Router();

const defaults = {
  addWishlist: createWishlistController,
  getWishlistsByUser: getWishlistsByUserController,
  deleteWishlist: deleteWishlistController,
};

export function getWishlistApiRouter(
  controllers: {
    addWishlist: ControllerType;
    deleteWishlist: ControllerType;
    getWishlistsByUser: ControllerType;
  } = defaults
) {
  router.use(isAuthentictedMiddleware);

  router
    .route("/:userId/wishlist")
    .post(controllers.addWishlist) //add item in wishlist
    .get(controllers.getWishlistsByUser); //get Wishlists By User

  router
    .route("/:userId/wishlist/:productId")
    .delete(controllers.deleteWishlist); //delete the product from Wishlist

  return router;
}
