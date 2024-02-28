import { ACCOUNT_ALREADY_EXISTS_ERROR_MESSAGE } from 'app/src/v1/domain/auth/errors';
import * as request from 'supertest';
import { createTestApp } from '../test.server';
import { databaseNames, setup } from '../jest.setup';
import { getTestDatasource } from '../test.db.connection';
import { DataSource } from 'typeorm';
import * as express from 'express';

let testDataSource: DataSource = null;
let testserver: express.Express = null;

beforeAll(async () => {
  await setup(databaseNames.register);
  testDataSource = getTestDatasource(databaseNames.register);
  testserver = createTestApp(testDataSource);
  await testDataSource.initialize();
});
afterAll(async () => {
  await testDataSource.destroy();
});
describe('POST /v1/auth/register', () => {
  it('should return 422 when missing fields', async () => {
    const res = await request(testserver).post('/v1/auth/register');
    expect(res.statusCode).toBe(422);
  });
  it('should return 201 when everything is valid', async () => {
    const res = await request(testserver).post('/v1/auth/register').send({
      email: 'testemail@gmail.com',
      firstName: 'testfirstname',
      lastName: 'testlastname',
      password: 'testpassword123@A',
      verifyPassword: 'testpassword123@A',
      username: 'testusername',
    });
    expect(res.statusCode).toBe(201);
  });
  it('should return 400 when email is already used', async () => {
    const res = await request(testserver).post('/v1/auth/register').send({
      email: 'testemail@gmail.com',
      firstName: 'testfirstname',
      lastName: 'testlastname',
      password: 'testpassword123@A',
      verifyPassword: 'testpassword123@A',
      username: 'testusername1',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toEqual(ACCOUNT_ALREADY_EXISTS_ERROR_MESSAGE);
  });
  it('should return 400 when username is already used', async () => {
    const res = await request(testserver).post('/v1/auth/register').send({
      email: 'testemail1@gmail.com',
      firstName: 'testfirstname',
      lastName: 'testlastname',
      password: 'testpassword123@A',
      verifyPassword: 'testpassword123@A',
      username: 'testusername',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toEqual(ACCOUNT_ALREADY_EXISTS_ERROR_MESSAGE);
  });
});
