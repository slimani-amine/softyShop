import { exceptionService } from '../../core/errors/exceptions';
import {
  IUserPasswordResetInformationsRepository,
  userPasswordResetInformationRepository,
} from '../../data/repositories/userPasswordResetInformation.repository';
import { IUsersRepository, usersRepo } from '../../data/repositories/users.repository';
import { IUser } from '../../domain/users/user';
import * as bcryptjs from 'bcryptjs';
import { validatePayloadSchema } from '../../utils/validation/validate.schema';
import passwordResetSchema from '../../presenters/schemas/auth/passwordReset.schema';
import {
  ACCOUNT_NOT_FOUND_ERROR_MESSAGE,
  RESET_PASSWORD_EXPIRED_ERROR_MESSAGE,
  RESET_PASSWORD_UNAUTHORIZED_ERROR_MESSAGE,
} from '../../domain/auth/errors';

export type PasswordResetPayload = {
  newPassword: string;
  verifyNewPassword: string;
  token: string;
};
export type PasswordResetUseCaseType = (payload: PasswordResetPayload) => Promise<{ user: IUser }>;

export const passwordResetUseCaseBase =
  (dependencies: {
    usersRepo: IUsersRepository;
    userPasswordResetInformationsRepo: IUserPasswordResetInformationsRepository;
  }) =>
  async (payload: PasswordResetPayload) => {
    validatePasswordResetPayload(payload);
    const passwordResetInformationFound =
      await dependencies.userPasswordResetInformationsRepo.findOne({
        where: {
          token: payload.token,
        },
        relations: {
          user: true,
        },
      });
    if (!passwordResetInformationFound) {
      exceptionService.unauthorizedException({
        message: RESET_PASSWORD_UNAUTHORIZED_ERROR_MESSAGE,
      });
    }
    if (!passwordResetInformationFound.user) {
      exceptionService.badRequestException({
        message: ACCOUNT_NOT_FOUND_ERROR_MESSAGE,
      });
    }
    if (passwordResetInformationFound.expirationDate < new Date()) {
      exceptionService.badRequestException({
        message: RESET_PASSWORD_EXPIRED_ERROR_MESSAGE,
      });
    }
    const salt = bcryptjs.genSaltSync(10);
    const password = bcryptjs.hashSync(payload.newPassword, salt);
    const updatedUser = await dependencies.usersRepo.updateOne(passwordResetInformationFound.user, {
      password: password,
    });
    await dependencies.userPasswordResetInformationsRepo.deleteOne(passwordResetInformationFound);
    return {
      user: updatedUser as IUser,
    };
  };

export function validatePasswordResetPayload(payload: PasswordResetPayload): boolean {
  validatePayloadSchema(passwordResetSchema, payload);
  return true;
}

export const passwordResetUseCase: PasswordResetUseCaseType = passwordResetUseCaseBase({
  usersRepo,
  userPasswordResetInformationsRepo: userPasswordResetInformationRepository,
});
