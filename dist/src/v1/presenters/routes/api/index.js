"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("./users");
const admin_1 = require("./admin");
const stores_1 = require("./stores");
const products_1 = require("./products");
const v1ApiRouter = (0, express_1.Router)();
const date = new Date();
v1ApiRouter.route('/healthcheck').get(async (req, res) => {
    return res.status(200).send(`Server Is Running ${date}`);
});
v1ApiRouter.use('/users', (0, users_1.getUsersApiRouter)());
v1ApiRouter.use('/admin', (0, admin_1.getAdminApiRouter)());
v1ApiRouter.use('/store', (0, stores_1.getStoresApiRouter)());
v1ApiRouter.use('/products', (0, products_1.getProductsApiRouter)());
exports.default = v1ApiRouter;
//# sourceMappingURL=index.js.map