import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.TEST_DATABASE_HOST,
  port: parseInt(process.env.TEST_DATABASE_PORT),
  username: process.env.TEST_DATABASE_USERNAME,
  password: process.env.TEST_DATABASE_PASSWORD,
  database: process.env.TEST_DATABASE_NAME,
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
