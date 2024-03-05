"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsApiRouter = void 0;
const express = require("express");
const isAuthenticated_middleware_1 = require("../../../middlewares/auth/isAuthenticated.middleware");
const getAllProducts_controller_1 = require("../../../controllers/api/product/getAllProducts.controller");
const createReview_controller_1 = require("../../../controllers/api/review/createReview.controller");
const deleteReview_controller_1 = require("../../../controllers/api/review/deleteReview.controller");
const getAllProductReviews_controller_1 = require("../../../controllers/api/review/getAllProductReviews.controller");
const restrictTo_middleware_1 = require("../../../middlewares/auth/restrictTo.middleware");
const updateReview_controller_1 = require("../../../controllers/api/review/updateReview.controller");
const router = express.Router();
const defaults = {
    getAllProducts: getAllProducts_controller_1.getAllProductsController,
    addReview: createReview_controller_1.createReviewController,
    productReviews: getAllProductReviews_controller_1.getAllProductReviewsController,
    deleteReview: deleteReview_controller_1.deleteReviewController,
    updateReview: updateReview_controller_1.updateReviewController,
};
function getProductsApiRouter(controllers = defaults) {
    router.use(isAuthenticated_middleware_1.isAuthentictedMiddleware);
    router.route("/").get(controllers.getAllProducts);
    router.route("/:id/review").get(controllers.productReviews);
    router
        .route("/review")
        .post((0, restrictTo_middleware_1.restrictToMiddleware)("user"), controllers.addReview);
    router
        .route("/review/:id")
        .delete(controllers.deleteReview)
        .patch(controllers.updateReview);
    return router;
}
exports.getProductsApiRouter = getProductsApiRouter;
//# sourceMappingURL=index.js.map