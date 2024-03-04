"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsApiRouter = void 0;
const express = require("express");
const isAuthenticated_middleware_1 = require("../../../middlewares/auth/isAuthenticated.middleware");
const getAllProducts_controller_1 = require("../../../controllers/api/product/getAllProducts.controller");
const router = express.Router();
const defaults = {
    getAllProducts: getAllProducts_controller_1.getAllProductsController,
};
function getProductsApiRouter(controllers = defaults) {
    router.use(isAuthenticated_middleware_1.isAuthentictedMiddleware);
    router.route("/").get(controllers.getAllProducts);
    return router;
}
exports.getProductsApiRouter = getProductsApiRouter;
//# sourceMappingURL=index.js.map