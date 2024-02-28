import * as express from 'express';
import { ControllerType } from '../../../../../types/controller';
import { createStoreController } from '../../../controllers/api/store/createStore.controller';
import { deleteStoresController } from '../../../controllers/api/store/deleteStore.controller';
import { getAllStoresController } from '../../../controllers/api/store/getAllStores.controller copy';
import { getOneStoreController } from '../../../controllers/api/store/getOneStore.controller';
import {
  VALIDATION_PATHS,
  validateSchemaMiddleware,
} from '../../../middlewares/schemas/validateSchema.middleware';
import createStoreSchema from '../../../schemas/store/createStore.schema';
import { restrictToMiddleware } from '../../../middlewares/auth/restrictTo.middleware';
import { isAuthentictedMiddleware } from '../../../middlewares/auth/isAuthenticated.middleware';

const router = express.Router();

const defaults = {
  createStore: createStoreController,
  getStore: getAllStoresController,
  deleteStore: deleteStoresController,
  getOneStore: getOneStoreController,
};

export function getStoresApiRouter(
  controllers: {
    createStore: ControllerType;
    getStore: ControllerType;
    deleteStore: ControllerType;
    getOneStore: ControllerType;
  } = defaults,
) {
  router.use(isAuthentictedMiddleware);

  router
    .route('/store')
    .get(controllers.getStore)
    .post(
      validateSchemaMiddleware(createStoreSchema, VALIDATION_PATHS.BODY),
      restrictToMiddleware('admin', 'vendor'),
      controllers.createStore,
    );

  router.use(restrictToMiddleware('admin', 'vendor'));
  router.route('/store/:id').delete(controllers.deleteStore).get(controllers.getOneStore);

  return router;
}
