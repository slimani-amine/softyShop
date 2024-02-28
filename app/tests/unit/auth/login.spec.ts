import { validateLoginPayload } from 'app/src/v1/usecases/auth/login.usecase';
import { VALIDATION_ERROR_MESSAGE } from 'app/src/v1/utils/validation/validate.schema';

const loginTestData: Array<{ payload: any; err: boolean }> = [
  {
    payload: {
      email: 'notemail',
      password: 'passwordA@1',
    },
    err: true,
  },
  {
    payload: {
      email: 'notemail@gmail.com',
      password: 'fwefw',
    },
    err: true,
  },
  {
    payload: {
      email: 'notemail@gmail.com',
      password: 'fweufw',
    },
    err: true,
  },
  {
    payload: {
      email: 'notemail@gmail.com',
      password: 'password@A1',
    },
    err: false,
  },
];

describe('LOGIN USER PAYLOADS TESTS', () => {
  for (const data of loginTestData) {
    if (data.err) {
      it('SHOULD RETURN AN ERROR', () => {
        expect(() => {
          validateLoginPayload(data.payload);
        }).toThrow(VALIDATION_ERROR_MESSAGE);
      });
    } else {
      it('SHOULD SUCCEED', () => {
        const result = validateLoginPayload(data.payload);
        expect(result).toEqual(true);
      });
    }
  }
});
