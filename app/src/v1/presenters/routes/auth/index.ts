import { Router } from 'express';
import { transactionalRegisterController } from '../../controllers/auth/register.controller';
import { loginController } from '../../controllers/auth/login.controller';
import { ControllerType } from '../../../../types/controller';
import { isRefreshPermissibledMiddleware } from '../../middlewares/auth/isRefreshPermissible.middleware';
import { refreshTokensController } from '../../controllers/auth/refreshTokens.controller';
import { requestAccountVerificationController } from '../../controllers/auth/requestAccountVerification.controller';
import { isVerificationRequestPermissibledMiddleware } from '../../middlewares/auth/isVerificationRequestPermissible';
import { verifyAccountController } from '../../controllers/auth/verifyAccount.controller';
import { requestPasswordResetController } from '../../controllers/auth/requestPasswordReset.controller';
import { passwordResetController } from '../../controllers/auth/passwordReset.controller';
import { isAuthentictedMiddleware } from '../../middlewares/auth/isAuthenticated.middleware';
import { logoutController } from '../../controllers/auth/logout.controller';
import { multerImageUpload } from '../../middlewares/uploads/multerUpload.middleware';
import {
  FilePathTypes,
  transferFilePathToBodyMiddlewareBuilder,
} from '../../middlewares/uploads/transferFilePathToBody.middleware';
import { setDefaultProfilePicIfNotGiven } from '../../middlewares/auth/setDefaultProfilePicIfNotGiven';

const v1AuthRouter = Router();
const defaults = {
  registerController: transactionalRegisterController,
  loginController: loginController,
  refreshTokensController: refreshTokensController,
  requestUserAccountVerificationController: requestAccountVerificationController,
  verifyAccountController: verifyAccountController,
  requestPasswordResetController: requestPasswordResetController,
  passwordResetController: passwordResetController,
  logoutController: logoutController,
};
function getV1AuthRouter(
  controllers: {
    registerController: ControllerType;
    loginController: ControllerType;
    refreshTokensController: ControllerType;
    requestUserAccountVerificationController: ControllerType;
    verifyAccountController: ControllerType;
    requestPasswordResetController: ControllerType;
    passwordResetController: ControllerType;
    logoutController: ControllerType;
  } = defaults,
) {
  v1AuthRouter
    .route('/register')
    .post(
      multerImageUpload.single('picture'),
      transferFilePathToBodyMiddlewareBuilder('picture', FilePathTypes.IMAGES),
      setDefaultProfilePicIfNotGiven('picture'),
      controllers.registerController,
    );
  v1AuthRouter.route('/login').post(controllers.loginController);
  v1AuthRouter
    .route('/tknr')
    .get(isRefreshPermissibledMiddleware, controllers.refreshTokensController);
  v1AuthRouter
    .route('/verification/request')
    .get(
      isVerificationRequestPermissibledMiddleware,
      controllers.requestUserAccountVerificationController,
    );
  v1AuthRouter.route('/verify-account').post(controllers.verifyAccountController);
  v1AuthRouter.route('/password-reset/request').post(controllers.requestPasswordResetController);
  v1AuthRouter.route('/password-reset').post(controllers.passwordResetController);
  v1AuthRouter.route('/logout').post(isAuthentictedMiddleware, controllers.logoutController);
  return v1AuthRouter;
}

export default getV1AuthRouter;
