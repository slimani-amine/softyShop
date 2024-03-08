import { Router, Request, Response } from "express";
import { getUsersApiRouter } from "./users";
import { getAdminApiRouter } from "./admin";
import { getStoresApiRouter } from "./stores";
import { getProductsApiRouter } from "./products";
import { getWishlistApiRouter } from "./shopping";

const v1ApiRouter = Router();
const date = new Date();
v1ApiRouter.route("/healthcheck").get(async (req: Request, res: Response) => {
  return res.status(200).send(`Server Is Running ${date}`);
});

v1ApiRouter.use("/users", getUsersApiRouter());

v1ApiRouter.use("/admin", getAdminApiRouter());

v1ApiRouter.use("/stores", getStoresApiRouter());

v1ApiRouter.use("/products", getProductsApiRouter());

v1ApiRouter.use("/shopping", getWishlistApiRouter());

export default v1ApiRouter;
