"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cookieParser = require("cookie-parser");
const api_1 = require("./v1/presenters/routes/api");
const auth_1 = require("./v1/presenters/routes/auth");
const handleError_middleware_1 = require("./v1/presenters/middlewares/errors/handleError.middleware");
const request_interceptor_1 = require("./v1/presenters/middlewares/interceptors/request.interceptor");
const response_interceptor_1 = require("./v1/presenters/middlewares/interceptors/response.interceptor");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");
const config_1 = require("./config");
const logger_1 = require("./v1/core/logger/logger");
const server = express();
const allowedOrigins = ['http://localhost:3000'];
server.use(function (req, res, next) {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
});
server.use(express.json());
server.use(cookieParser());
server.use(request_interceptor_1.requestInterceptor);
server.use(response_interceptor_1.responseInterceptor);
server.use(express.static(config_1.STATIC_FILES_PATH));
server.use('/v1/api', api_1.default);
server.use('/v1/auth', (0, auth_1.default)());
const swaggerDefinition = {
    openapi: '3.0.3',
    info: {
        title: 'SoftyShop Api',
        description: 'SoftyShop Api Docs',
        version: '2.0.0',
    },
    servers: [
        {
            url: config_1.DOCS_API_BASE_URL,
            description: 'Local server',
        },
    ],
};
const options = {
    swaggerDefinition,
    apis: [path.resolve(__dirname, '../docs/**/*.yaml')],
};
server.use(handleError_middleware_1.handleErrorMiddleware);
const swaggerDoc = swaggerJsDoc(options);
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
server.on('close', () => {
    logger_1.logger.log('APP', `SERVER CLOSED`);
});
server.on('error', (error) => {
    console.error('Express App Error:', error);
});
exports.default = server;
//# sourceMappingURL=server.js.map