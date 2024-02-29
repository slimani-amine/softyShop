import * as express from "express";
import { getUsersController } from "../../../controllers/api/users/getUsers.controller";
import { ControllerType } from "../../../../../types/controller";
import { updateMyProfileController } from "../../../controllers/auth/updateMyProfile.controller";
import { getMeController } from "../../../controllers/auth/getMe.controller";
import { multerImageUpload } from "../../../middlewares/uploads/multerUpload.middleware";
import {
  FilePathTypes,
  transferFilePathToBodyMiddlewareBuilder,
} from "../../../middlewares/uploads/transferFilePathToBody.middleware";
import {
  VALIDATION_PATHS,
  validateSchemaMiddleware,
} from "../../../middlewares/schemas/validateSchema.middleware";
import {
  isAuthentictedMiddleware,
  isAuthentictedMiddlewareNoVerificationNeeded,
} from "../../../middlewares/auth/isAuthenticated.middleware";
import updateProfileSchema from "../../../schemas/auth/updateProfile.schema";
import { restrictToMiddleware } from "../../../middlewares/auth/restrictTo.middleware";
import { createAddressController } from "../../../controllers/api/addresses/createAddresse.controller";
import { deleteAddressesController } from "../../../controllers/api/addresses/deleteAddresse.controller";
import { getUserAddressesController } from "../../../controllers/api/addresses/getUserAddresses.controller";
import { getOneAddressController } from "../../../controllers/api/addresses/getOneAddresse.controller";
import { updateAddressController } from "../../../controllers/api/addresses/updateAddresse.controller";

const router = express.Router();

const defaults = {
  getUsers: getUsersController,
  updateMyProfileController: updateMyProfileController,
  getMeController: getMeController,
  createAddress: createAddressController,
  deleteAddress: deleteAddressesController,
  userAddresses: getUserAddressesController,
  oneAdress: getOneAddressController,
  updateAddress: updateAddressController,
};

export function getUsersApiRouter(
  controllers: {
    getUsers: ControllerType;
    updateMyProfileController: ControllerType;
    getMeController: ControllerType;
    createAddress: ControllerType;
    deleteAddress: ControllerType;
    userAddresses: ControllerType;
    oneAdress: ControllerType;
    updateAddress: ControllerType;
  } = defaults
) {
  router.use(isAuthentictedMiddleware);
  router.route("/me").get(controllers.getMeController);

  router
    .route("/update-me")
    .patch(
      multerImageUpload.single("picture"),
      transferFilePathToBodyMiddlewareBuilder("picture", FilePathTypes.IMAGES),
      validateSchemaMiddleware(updateProfileSchema, VALIDATION_PATHS.BODY),
      controllers.updateMyProfileController
    );

  router.route("/").get(restrictToMiddleware("admin"), controllers.getUsers);

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
