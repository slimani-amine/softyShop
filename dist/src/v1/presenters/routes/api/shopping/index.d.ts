import { ControllerType } from "../../../../../types/controller";
export declare function getWishlistApiRouter(controllers?: {
    addWishlist: ControllerType;
    deleteWishlist: ControllerType;
    getWishlistsByUser: ControllerType;
    getUserCart: ControllerType;
    addProductToCart: ControllerType;
    getUserCartProduct: ControllerType;
    deleteProductFromCart: ControllerType;
}): import("express-serve-static-core").Router;
