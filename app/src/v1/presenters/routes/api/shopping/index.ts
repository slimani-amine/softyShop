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
import { createOrderController } from "../../../controllers/api/orders/createOrder.controller";
import { updateOrderController } from "../../../controllers/api/orders/updateOrder.controller";
import { getOrderByIdController } from "../../../controllers/api/orders/getOneOrder.controller";
import { payOrderController } from "../../../controllers/api/orders/payOrder.controller";
import { myOrdersController } from "../../../controllers/api/orders/my-orders.controller";

const router = express.Router();

const defaults = {
  addWishlist: createWishlistController,
  getWishlistsByUser: getWishlistsByUserController,
  deleteWishlist: deleteWishlistController,
  getUserCart: getCartController,
  addProductToCart: addProductToCartController,
  getUserCartProduct: getUserCartProductController,
  deleteProductFromCart: deleteProductFromCartController,
  createOrder: createOrderController,
  updateOrder: updateOrderController,
  getOrderById: getOrderByIdController,
  payOrder: payOrderController,
  myOrders: myOrdersController,
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
    createOrder: ControllerType;
    updateOrder: ControllerType;
    getOrderById: ControllerType;
    payOrder: ControllerType;
    myOrders: ControllerType;
  } = defaults
) {
  router.use(isAuthentictedMiddleware);

  router
    .route("/my-wishlist")
    .post(controllers.addWishlist) //add item in wishlist
    .get(controllers.getWishlistsByUser); //get Wishlists By User

  router.route("/my-wishlist/:productId").delete(controllers.deleteWishlist); //delete the product from Wishlist

  router
    .route("/my-cart")
    .get(controllers.getUserCartProduct) //get the cart + products
    .post(controllers.addProductToCart); //add product to a cart

  router.route("/my-cart/:productId").delete(controllers.deleteProductFromCart); //delete the product from cart

  router.route("/my-cart/orders").post(controllers.createOrder); // pass the cart to the order
  router.route("/my-cart/my-orders").get(controllers.myOrders); // get my orders
  router
    .route("/my-cart/orders/:id")
    .patch(controllers.updateOrder)
    .get(controllers.getOrderById); //add product to a cart
  router.route("/my-cart/orders/:id/payment").patch(controllers.payOrder);
  return router;
}
