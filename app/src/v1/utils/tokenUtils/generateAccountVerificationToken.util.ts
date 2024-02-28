import { IUser } from '../../domain/users/user';
import { generateResetPasswordToken } from './generateResetPasswordToken.util';

export const generateAccountVerificationTokenForUser = (user: IUser): string => {
  const token = generateResetPasswordToken(user);
  return token;
};
