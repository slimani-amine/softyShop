import { ControllerType } from "../../../../../types/controller";
export declare function getProductsApiRouter(controllers?: {
    getAllProducts: ControllerType;
    productReviews: ControllerType;
    addReview: ControllerType;
    deleteReview: ControllerType;
    updateReview: ControllerType;
}): import("express-serve-static-core").Router;
