"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_controller_1 = require("../../controllers/auth/register.controller");
const login_controller_1 = require("../../controllers/auth/login.controller");
const isRefreshPermissible_middleware_1 = require("../../middlewares/auth/isRefreshPermissible.middleware");
const refreshTokens_controller_1 = require("../../controllers/auth/refreshTokens.controller");
const requestAccountVerification_controller_1 = require("../../controllers/auth/requestAccountVerification.controller");
const isVerificationRequestPermissible_1 = require("../../middlewares/auth/isVerificationRequestPermissible");
const verifyAccount_controller_1 = require("../../controllers/auth/verifyAccount.controller");
const requestPasswordReset_controller_1 = require("../../controllers/auth/requestPasswordReset.controller");
const passwordReset_controller_1 = require("../../controllers/auth/passwordReset.controller");
const isAuthenticated_middleware_1 = require("../../middlewares/auth/isAuthenticated.middleware");
const logout_controller_1 = require("../../controllers/auth/logout.controller");
const multerUpload_middleware_1 = require("../../middlewares/uploads/multerUpload.middleware");
const transferFilePathToBody_middleware_1 = require("../../middlewares/uploads/transferFilePathToBody.middleware");
const setDefaultProfilePicIfNotGiven_1 = require("../../middlewares/auth/setDefaultProfilePicIfNotGiven");
const v1AuthRouter = (0, express_1.Router)();
const defaults = {
    registerController: register_controller_1.transactionalRegisterController,
    loginController: login_controller_1.loginController,
    refreshTokensController: refreshTokens_controller_1.refreshTokensController,
    requestUserAccountVerificationController: requestAccountVerification_controller_1.requestAccountVerificationController,
    verifyAccountController: verifyAccount_controller_1.verifyAccountController,
    requestPasswordResetController: requestPasswordReset_controller_1.requestPasswordResetController,
    passwordResetController: passwordReset_controller_1.passwordResetController,
    logoutController: logout_controller_1.logoutController,
};
function getV1AuthRouter(controllers = defaults) {
    v1AuthRouter
        .route('/register')
        .post(multerUpload_middleware_1.multerImageUpload.single('picture'), (0, transferFilePathToBody_middleware_1.transferFilePathToBodyMiddlewareBuilder)('picture', transferFilePathToBody_middleware_1.FilePathTypes.IMAGES), (0, setDefaultProfilePicIfNotGiven_1.setDefaultProfilePicIfNotGiven)('picture'), controllers.registerController);
    v1AuthRouter.route('/login').post(controllers.loginController);
    v1AuthRouter
        .route('/tknr')
        .get(isRefreshPermissible_middleware_1.isRefreshPermissibledMiddleware, controllers.refreshTokensController);
    v1AuthRouter
        .route('/verification/request')
        .get(isVerificationRequestPermissible_1.isVerificationRequestPermissibledMiddleware, controllers.requestUserAccountVerificationController);
    v1AuthRouter.route('/verify-account').post(controllers.verifyAccountController);
    v1AuthRouter.route('/password-reset/request').post(controllers.requestPasswordResetController);
    v1AuthRouter.route('/password-reset').post(controllers.passwordResetController);
    v1AuthRouter.route('/logout').post(isAuthenticated_middleware_1.isAuthentictedMiddleware, controllers.logoutController);
    return v1AuthRouter;
}
exports.default = getV1AuthRouter;
//# sourceMappingURL=index.js.map