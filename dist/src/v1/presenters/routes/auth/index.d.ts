import { ControllerType } from '../../../../types/controller';
declare function getV1AuthRouter(controllers?: {
    registerController: ControllerType;
    loginController: ControllerType;
    refreshTokensController: ControllerType;
    requestUserAccountVerificationController: ControllerType;
    verifyAccountController: ControllerType;
    requestPasswordResetController: ControllerType;
    passwordResetController: ControllerType;
    logoutController: ControllerType;
}): import("express-serve-static-core").Router;
export default getV1AuthRouter;
