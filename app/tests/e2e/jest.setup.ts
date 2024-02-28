// global.console.log = jest.fn(); // Mock console.log

import { defaultTestDataSource } from './test.db.connection';

export const databaseNames = {
  'create.category': 'createcategory',
  'update.category': 'updatecategory',
  'delete.category': 'deletecategory',
  register: 'register',
};

export async function setup(dbName: string) {
  await defaultTestDataSource.initialize();
  const promises = [];
  promises.push(defaultTestDataSource.manager.query(`DROP DATABASE IF EXISTS ${dbName};`));
  promises.push(defaultTestDataSource.manager.query(`CREATE DATABASE ${dbName};`));
  await Promise.all(promises);
  await defaultTestDataSource.destroy();
}
