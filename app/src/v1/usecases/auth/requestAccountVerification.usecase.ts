import { FRONT_END_BASE_URL } from '../../../config';
import { exceptionService } from '../../core/errors/exceptions';
import { IUsersRepository, usersRepo } from '../../data/repositories/users.repository';
import { IUser } from '../../domain/users/user';
import { sendUserVerificationMailUseCase } from '../api/mailing/sendVerificationMail.usecase';
import { generateAccountVerificationTokenForUser } from '../../utils/tokenUtils/generateAccountVerificationToken.util';
import { IRequestUser } from './types/IRequestUser';
import { ACCOUNT_NOT_FOUND_ERROR_MESSAGE } from '../../domain/auth/errors';

export type RequestAccountVerificationUseCaseType = (
  payload: IRequestUser,
) => Promise<{ user: IUser }>;

export const requestAccountVerificationUseCaseBase =
  (dependencies: {
    usersRepo: IUsersRepository;
    generateAndSendUserAccountVerificationEmail: (
      user: IUser,
      usersRepo: IUsersRepository,
    ) => Promise<string>;
  }) =>
  async (user: IRequestUser) => {
    const userFound = await dependencies.usersRepo.findOne({
      where: {
        id: parseInt(user.id),
        confirmed_email: false,
      },
    });

    if (!userFound) {
      exceptionService.notFoundException({
        message: ACCOUNT_NOT_FOUND_ERROR_MESSAGE,
      });
    }

    await dependencies.generateAndSendUserAccountVerificationEmail(
      userFound,
      dependencies.usersRepo,
    );

    return {
      user: userFound,
    };
  };

export async function generateAndSendUserAccountVerificationEmail(
  user: IUser,
  usersRepo: IUsersRepository,
): Promise<string> {
  const verificationToken = generateAccountVerificationTokenForUser(user);

  await usersRepo.updateOne(user, {
    confirmation_token: verificationToken,
  });

  const link = `${FRONT_END_BASE_URL}/verify-account/${verificationToken}`;

  await sendUserVerificationMailUseCase(user, {
    link: link,
  });

  return link;
}

export const requestAccountVerificationUseCase: RequestAccountVerificationUseCaseType =
  requestAccountVerificationUseCaseBase({
    usersRepo,
    generateAndSendUserAccountVerificationEmail: generateAndSendUserAccountVerificationEmail,
  });
