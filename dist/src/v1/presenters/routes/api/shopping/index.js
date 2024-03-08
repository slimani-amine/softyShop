"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWishlistApiRouter = void 0;
const express = require("express");
const isAuthenticated_middleware_1 = require("../../../middlewares/auth/isAuthenticated.middleware");
const addProductToWishlist_controller_1 = require("../../../controllers/api/wishlist/addProductToWishlist.controller");
const deleteProductWishlist_controller_1 = require("../../../controllers/api/wishlist/deleteProductWishlist.controller");
const getUserWishlists_controller_1 = require("../../../controllers/api/wishlist/getUserWishlists.controller");
const getCart_controller_1 = require("../../../controllers/api/cart/getCart.controller");
const addProductToCart_controller_1 = require("../../../controllers/api/cartProduct/addProductToCart.controller");
const getUserCartProduct_controller_1 = require("../../../controllers/api/cartProduct/getUserCartProduct.controller");
const deleteProductFromCart_controller_1 = require("../../../controllers/api/cartProduct/deleteProductFromCart.controller");
const router = express.Router();
const defaults = {
    addWishlist: addProductToWishlist_controller_1.createWishlistController,
    getWishlistsByUser: getUserWishlists_controller_1.getWishlistsByUserController,
    deleteWishlist: deleteProductWishlist_controller_1.deleteWishlistController,
    getUserCart: getCart_controller_1.getCartController,
    addProductToCart: addProductToCart_controller_1.addProductToCartController,
    getUserCartProduct: getUserCartProduct_controller_1.getUserCartProductController,
    deleteProductFromCart: deleteProductFromCart_controller_1.deleteProductFromCartController,
};
function getWishlistApiRouter(controllers = defaults) {
    router.use(isAuthenticated_middleware_1.isAuthentictedMiddleware);
    router
        .route("/:userId/wishlist")
        .post(controllers.addWishlist)
        .get(controllers.getWishlistsByUser);
    router
        .route("/:userId/wishlist/:productId")
        .delete(controllers.deleteWishlist);
    router.route("/:userId/cart/:cartId").get(controllers.getUserCart);
    router.route("/:userId/cartProduct/:cartId").get(controllers.getUserCartProduct);
    router
        .route("/:userId/cart/:cartId/product")
        .post(controllers.addProductToCart);
    router
        .route("/:userId/cart/:cartId/product/:cartProductId")
        .delete(controllers.deleteProductFromCart);
    return router;
}
exports.getWishlistApiRouter = getWishlistApiRouter;
//# sourceMappingURL=index.js.map