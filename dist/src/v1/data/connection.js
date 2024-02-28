"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
exports.dataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + '/./**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: false,
    ssl: false,
    migrationsTableName: 'migration_audit',
});
exports.default = exports.dataSource;
//# sourceMappingURL=connection.js.map