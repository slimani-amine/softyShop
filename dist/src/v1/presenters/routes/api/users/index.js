"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersApiRouter = void 0;
const express = require("express");
const getUsers_controller_1 = require("../../../controllers/api/users/getUsers.controller");
const updateMyProfile_controller_1 = require("../../../controllers/auth/updateMyProfile.controller");
const getMe_controller_1 = require("../../../controllers/auth/getMe.controller");
const multerUpload_middleware_1 = require("../../../middlewares/uploads/multerUpload.middleware");
const transferFilePathToBody_middleware_1 = require("../../../middlewares/uploads/transferFilePathToBody.middleware");
const validateSchema_middleware_1 = require("../../../middlewares/schemas/validateSchema.middleware");
const isAuthenticated_middleware_1 = require("../../../middlewares/auth/isAuthenticated.middleware");
const updateProfile_schema_1 = require("../../../schemas/auth/updateProfile.schema");
const restrictTo_middleware_1 = require("../../../middlewares/auth/restrictTo.middleware");
const createAddresse_controller_1 = require("../../../controllers/api/addresses/createAddresse.controller");
const deleteAddresse_controller_1 = require("../../../controllers/api/addresses/deleteAddresse.controller");
const getUserAddresses_controller_1 = require("../../../controllers/api/addresses/getUserAddresses.controller");
const getOneAddresse_controller_1 = require("../../../controllers/api/addresses/getOneAddresse.controller");
const updateAddresse_controller_1 = require("../../../controllers/api/addresses/updateAddresse.controller");
const changeUserRole_controller_1 = require("../../../controllers/api/users/changeUserRole.controller");
const router = express.Router();
const defaults = {
    getUsers: getUsers_controller_1.getUsersController,
    updateMyProfileController: updateMyProfile_controller_1.updateMyProfileController,
    getMeController: getMe_controller_1.getMeController,
    createAddress: createAddresse_controller_1.createAddressController,
    deleteAddress: deleteAddresse_controller_1.deleteAddressesController,
    userAddresses: getUserAddresses_controller_1.getUserAddressesController,
    oneAdress: getOneAddresse_controller_1.getOneAddressController,
    updateAddress: updateAddresse_controller_1.updateAddressController,
    changeUserRole: changeUserRole_controller_1.changeUserRoleController,
};
function getUsersApiRouter(controllers = defaults) {
    router.use(isAuthenticated_middleware_1.isAuthentictedMiddleware);
    router.route("/me").get(controllers.getMeController);
    router
        .route("/update-me")
        .patch(multerUpload_middleware_1.multerImageUpload.single("picture"), (0, transferFilePathToBody_middleware_1.transferFilePathToBodyMiddlewareBuilder)("picture", transferFilePathToBody_middleware_1.FilePathTypes.IMAGES), (0, validateSchema_middleware_1.validateSchemaMiddleware)(updateProfile_schema_1.default, validateSchema_middleware_1.VALIDATION_PATHS.BODY), controllers.updateMyProfileController);
    router.route("/").get((0, restrictTo_middleware_1.restrictToMiddleware)("admin"), controllers.getUsers);
    router
        .route("/change-user-role")
        .get((0, restrictTo_middleware_1.restrictToMiddleware)("admin"), controllers.changeUserRole);
    router
        .route("/addresses")
        .post(controllers.createAddress)
        .get(controllers.userAddresses);
    router
        .route("/addresses/:id")
        .delete(controllers.deleteAddress)
        .get(controllers.oneAdress)
        .patch(controllers.updateAddress);
    return router;
}
exports.getUsersApiRouter = getUsersApiRouter;
//# sourceMappingURL=index.js.map