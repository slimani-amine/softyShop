import { Router, Request, Response } from 'express';
import { getUsersApiRouter } from './users';
import { getAdminApiRouter } from './admin';
import { getStoresApiRouter } from './stores';
import { getProductsApiRouter } from './products';

const v1ApiRouter = Router();
const date = new Date();
v1ApiRouter.route('/healthcheck').get(async (req: Request, res: Response) => {
  return res.status(200).send(`Server Is Running ${date}`);
});
v1ApiRouter.use('/users', getUsersApiRouter());

v1ApiRouter.use('/admin', getAdminApiRouter());

v1ApiRouter.use('/store', getStoresApiRouter());

v1ApiRouter.use('/products', getProductsApiRouter());

export default v1ApiRouter;
