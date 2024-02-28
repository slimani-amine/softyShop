"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const server_1 = require("./server");
const logger_1 = require("./v1/core/logger/logger");
const connection_1 = require("./v1/data/connection");
const config_1 = require("./config");
server_1.default.listen(config_1.PORT, async () => {
    logger_1.logger.log('APP', `SERVER IS NOW LISTENING AT PORT  ${config_1.PORT}`);
    await connection_1.dataSource.initialize();
});
//# sourceMappingURL=index.js.map