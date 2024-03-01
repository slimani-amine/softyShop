"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminApiRouter = void 0;
const express = require("express");
const restrictTo_middleware_1 = require("../../../middlewares/auth/restrictTo.middleware");
const isAuthenticated_middleware_1 = require("../../../middlewares/auth/isAuthenticated.middleware");
const createCategory_controller_1 = require("../../../controllers/api/category/createCategory.controller");
const deleteCategory_controller_1 = require("../../../controllers/api/category/deleteCategory.controller");
const getAllCategories_controller_1 = require("../../../controllers/api/category/getAllCategories.controller");
const updateCategory_controller_1 = require("../../../controllers/api/category/updateCategory.controller");
const createMethod_controller_1 = require("../../../controllers/api/paymentMethod/createMethod.controller");
const deleteMethod_controller_1 = require("../../../controllers/api/paymentMethod/deleteMethod.controller");
const getAllMethods_controller_1 = require("../../../controllers/api/paymentMethod/getAllMethods.controller");
const updateMethod_controller_1 = require("../../../controllers/api/paymentMethod/updateMethod.controller");
const router = express.Router();
const defaults = {
    createCategory: createCategory_controller_1.createCategoryController,
    deleteCategory: deleteCategory_controller_1.deleteCategoryController,
    getCategories: getAllCategories_controller_1.getAllCategoryController,
    updateCategory: updateCategory_controller_1.updatecategoryController,
    createPaymentMethod: createMethod_controller_1.createMethodController,
    deletePaymentMethod: deleteMethod_controller_1.deletePayementMethodController,
    updatePaymentMethod: updateMethod_controller_1.updatepaymentMethodController,
    getPaymentMethods: getAllMethods_controller_1.getAllPayementMethodsController,
};
function getAdminApiRouter(controllers = defaults) {
    router.use(isAuthenticated_middleware_1.isAuthentictedMiddleware);
    router
        .route("/category")
        .post((0, restrictTo_middleware_1.restrictToMiddleware)("admin"), controllers.createCategory)
        .get((0, restrictTo_middleware_1.restrictToMiddleware)("admin", "vendor"), controllers.getCategories);
    router
        .route("/category/:id")
        .patch((0, restrictTo_middleware_1.restrictToMiddleware)("admin"), controllers.updateCategory)
        .delete((0, restrictTo_middleware_1.restrictToMiddleware)("admin"), controllers.deleteCategory);
    router
        .route("/payment-method")
        .post((0, restrictTo_middleware_1.restrictToMiddleware)("admin"), controllers.createPaymentMethod)
        .get((0, restrictTo_middleware_1.restrictToMiddleware)("admin", "vendor"), controllers.getPaymentMethods);
    router
        .route("/payment-method/:id")
        .delete((0, restrictTo_middleware_1.restrictToMiddleware)("admin"), controllers.deletePaymentMethod)
        .patch((0, restrictTo_middleware_1.restrictToMiddleware)("admin", "vendor"), controllers.updatePaymentMethod);
    return router;
}
exports.getAdminApiRouter = getAdminApiRouter;
//# sourceMappingURL=index.js.map