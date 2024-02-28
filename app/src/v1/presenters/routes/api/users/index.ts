import * as express from 'express';
import { getUsersController } from '../../../controllers/api/users/getUsers.controller';
import { ControllerType } from '../../../../../types/controller';
import { updateMyProfileController } from '../../../controllers/auth/updateMyProfile.controller';
import { getMeController } from '../../../controllers/auth/getMe.controller';
import { multerImageUpload } from '../../../middlewares/uploads/multerUpload.middleware';
import {
  FilePathTypes,
  transferFilePathToBodyMiddlewareBuilder,
} from '../../../middlewares/uploads/transferFilePathToBody.middleware';
import {
  VALIDATION_PATHS,
  validateSchemaMiddleware,
} from '../../../middlewares/schemas/validateSchema.middleware';
import {
  isAuthentictedMiddleware,
  isAuthentictedMiddlewareNoVerificationNeeded,
} from '../../../middlewares/auth/isAuthenticated.middleware';
import updateProfileSchema from '../../../schemas/auth/updateProfile.schema';
import { restrictToMiddleware } from '../../../middlewares/auth/restrictTo.middleware';

const router = express.Router();

const defaults = {
  getUsers: getUsersController,
  updateMyProfileController: updateMyProfileController,
  getMeController: getMeController,
};

export function getUsersApiRouter(
  controllers: {
    getUsers: ControllerType;
    updateMyProfileController: ControllerType;
    getMeController: ControllerType;
  } = defaults,
) {
  router.route('/me').get(controllers.getMeController);
  router.use(isAuthentictedMiddleware);

  router
    .route('/update-me')
    .patch(
      multerImageUpload.single('picture'),
      transferFilePathToBodyMiddlewareBuilder('picture', FilePathTypes.IMAGES),
      validateSchemaMiddleware(updateProfileSchema, VALIDATION_PATHS.BODY),
      controllers.updateMyProfileController,
    );


  router.route('/').get(restrictToMiddleware('admin'), controllers.getUsers);

  return router;
}
