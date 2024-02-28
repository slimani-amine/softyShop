"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("./users");
const store_1 = require("./store");
const v1ApiRouter = (0, express_1.Router)();
const date = new Date();
v1ApiRouter.route('/healthcheck').get(async (req, res) => {
    return res.status(200).send(`Server Is Running ${date}`);
});
v1ApiRouter.use('/users', (0, users_1.getUsersApiRouter)());
v1ApiRouter.use('/vendor', (0, store_1.getStoresApiRouter)());
exports.default = v1ApiRouter;
//# sourceMappingURL=index.js.map