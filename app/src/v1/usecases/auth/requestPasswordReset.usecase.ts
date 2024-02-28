import { FRONT_END_BASE_URL } from '../../../config';
import { exceptionService } from '../../core/errors/exceptions';
import {
  IUserPasswordResetInformationsRepository,
  userPasswordResetInformationRepository,
} from '../../data/repositories/userPasswordResetInformation.repository';
import { IUsersRepository, usersRepo } from '../../data/repositories/users.repository';
import { IUser } from '../../domain/users/user';
import {
  MailUserPasswordResetUseCaseType,
  sendUserPasswordResetMailUseCase,
} from '../api/mailing/sendResetPasswordMail.usecase';
import { generateResetPasswordToken } from '../../utils/tokenUtils/generateResetPasswordToken.util';
import { validatePayloadSchema } from '../../utils/validation/validate.schema';
import requestPasswordResetSchema from '../../presenters/schemas/auth/requestPasswordReset.schema';
import { ACCOUNT_NOT_FOUND_ERROR_MESSAGE } from '../../domain/auth/errors';

export type RequestPasswordResetUseCaseType = (payload: {
  email: string;
}) => Promise<{ user: IUser }>;

export const requestPasswordResetUseCaseBase =
  (dependencies: {
    usersRepo: IUsersRepository;
    userPasswordResetInformationsRepo: IUserPasswordResetInformationsRepository;
    sendUserPasswordResetMailUseCase: MailUserPasswordResetUseCaseType;
  }) =>
  async (payload: { email: string }) => {
    validatePasswordResetRequestPayload(payload);
    const userFound = await dependencies.usersRepo.findOne({
      where: {
        email: payload.email,
      },
    });

    if (!userFound) {
      exceptionService.notFoundException({
        message: ACCOUNT_NOT_FOUND_ERROR_MESSAGE,
      });
    }

    const resetPasswordToken = generateResetPasswordToken(userFound);

    const userPasswordResetInfo = await dependencies.userPasswordResetInformationsRepo.findOne({
      where: {
        user_id: userFound.getIdAsNumber(),
      },
    });

    if (!userPasswordResetInfo) {
      await dependencies.userPasswordResetInformationsRepo.create({
        userId: userFound.id,
        expirationDate: new Date(Date.now() + 600000),
        token: resetPasswordToken,
      });
    } else {
      await dependencies.userPasswordResetInformationsRepo.updateOne(userPasswordResetInfo, {
        token: resetPasswordToken,
      });
    }

    const link = `${FRONT_END_BASE_URL}/reset-password/${resetPasswordToken}`;

    await dependencies.sendUserPasswordResetMailUseCase(userFound, {
      link,
    });

    return {
      user: userFound,
    };
  };

export function validatePasswordResetRequestPayload(payload: { email: string }): boolean {
  validatePayloadSchema(requestPasswordResetSchema, payload);
  return true;
}

export const requestPasswordResetUseCase: RequestPasswordResetUseCaseType =
  requestPasswordResetUseCaseBase({
    usersRepo,
    userPasswordResetInformationsRepo: userPasswordResetInformationRepository,
    sendUserPasswordResetMailUseCase: sendUserPasswordResetMailUseCase,
  });
