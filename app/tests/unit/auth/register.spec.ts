import { validateRegisterPayload } from 'app/src/v1/usecases/auth/register.usecase';
import { VALIDATION_ERROR_MESSAGE } from 'app/src/v1/utils/validation/validate.schema';

const registerTestData: Array<{ payload: any; err: boolean; expectedRetun?: any }> = [
  {
    payload: {
      email: 'notemail',
      firstName: 'firstname',
      lastName: 'lastname',
      password: 'password@A1',
      verifyPassword: 'password@A1',
      username: 'testusername',
      picture: '',
    },
    err: true,
  },
  {
    payload: {
      email: 'notemail@gmail.com',
      firstName: '1',
      lastName: 'lastname',
      password: 'password@A1',
      verifyPassword: 'password@A1',
      username: 'testusername',
      picture: '',
    },
    err: true,
  },
  {
    payload: {
      email: 'notemail@gmail.com',
      firstName: 'firstname',
      lastName: 'lastname',
      password: 'password',
      verifyPassword: 'password@A1',
      username: 'password@A1',
      picture: '',
    },
    err: true,
  },
  {
    payload: {
      email: 'notemail@gmail.com',
      firstName: 'firstname',
      lastName: '2',
      password: 'password@A1',
      verifyPassword: 'password@A1',
      username: 'testusername',
      picture: '',
    },
    err: true,
  },
  {
    payload: {
      email: 'notemail@gmail.com',
      firstName: 'firstname',
      lastName: '2',
      password: 'password@A1',
      verifyPassword: 'password@A12',
      username: 'testusername',
      picture: '',
    },
    err: true,
  },
  {
    payload: {
      email: 'notemail@gmail.com',
      firstName: 'firstname',
      lastName: 'lastname',
      password: 'password@A1',
      verifyPassword: 'password@A1',
      username: 'testusername',
      picture: '',
    },
    err: false,
    expectedRetun: {
      email: 'notemail@gmail.com',
      firstName: 'firstname',
      lastName: 'lastname',
      username: 'testusername',
    },
  },
];

describe('RESIGTER USER PAYLOADS TESTS', () => {
  for (const data of registerTestData) {
    if (data.err) {
      it('SHOULD RETURN AN ERROR', () => {
        expect(() => {
          validateRegisterPayload(data.payload);
        }).toThrow(VALIDATION_ERROR_MESSAGE);
      });
    } else {
      it('SHOULD SUCCEED', () => {
        const result = validateRegisterPayload(data.payload);
        Object.keys(data.expectedRetun).forEach((key: string) => {
          expect(result[key]).toEqual(data.expectedRetun[key]);
        });
      });
    }
  }
});
