import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
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

export default dataSource;
