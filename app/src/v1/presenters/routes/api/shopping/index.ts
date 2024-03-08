import * as express from "express";
import { ControllerType } from "../../../../../types/controller";
import { isAuthentictedMiddleware } from "../../../middlewares/auth/isAuthenticated.middleware";
import { createWishlistController } from "../../../controllers/api/wishlist/addProductToWishlist.controller";
import { deleteWishlistController } from "../../../controllers/api/wishlist/deleteProductWishlist.controller";
import { getWishlistsByUserController } from "../../../controllers/api/wishlist/getUserWishlists.controller";
import { getCartController } from "../../../controllers/api/cart/getCart.controller";
import { addProductToCartController } from "../../../controllers/api/cartProduct/addProductToCart.controller";
import { getUserCartProductController } from "../../../controllers/api/cartProduct/getUserCartProduct.controller";
import { deleteProductFromCartController } from "../../../controllers/api/cartProduct/deleteProductFromCart.controller";

const router = express.Router();

const defaults = {
  addWishlist: createWishlistController,
  getWishlistsByUser: getWishlistsByUserController,
  deleteWishlist: deleteWishlistController,
  getUserCart: getCartController,
  addProductToCart: addProductToCartController,
  getUserCartProduct: getUserCartProductController,
  deleteProductFromCart: deleteProductFromCartController,
};

export function getWishlistApiRouter(
  controllers: {
    addWishlist: ControllerType;
    deleteWishlist: ControllerType;
    getWishlistsByUser: ControllerType;
    getUserCart: ControllerType;
    addProductToCart: ControllerType;
    getUserCartProduct: ControllerType;
    deleteProductFromCart: ControllerType;
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

  router.route("/my-cart").get(controllers.getUserCart); //get the cart
  router.route("/cart").get(controllers.getUserCartProduct); //get the cart + products

  router
    .route("/cart/product")
    .post(controllers.addProductToCart); //add product to a cart

  router
    .route("/cart/product/:cartProductId")
    .delete(controllers.deleteProductFromCart); //delete the product from cart

  return router;
}
