import { IUser } from '../../domain/users/user';
import * as crypto from 'crypto';

export const generateResetPasswordToken = (user: IUser): string => {
  const randomBytes = crypto.randomBytes(32);
  const token = randomBytes.toString('hex');
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(user.email + token + user.id + Date.now().toString())
    .digest('hex');
  return resetPasswordToken;
};
