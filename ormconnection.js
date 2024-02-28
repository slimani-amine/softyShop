import 'dotenv/config';
import { DataSource } from 'typeorm';
const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['./app/src/v1/data/orm_models/*.entity{.ts,.js}'],
  synchronize: false,
  logging: false,
  migrationsTableName: 'migration_audit',
  migrations: ['./migrations/*.ts'],
  cli: {
    migrationsDir: './migrations',
  },
});

export default dataSource;
