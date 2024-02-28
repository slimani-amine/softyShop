import { exceptionService } from '../../core/errors/exceptions';
import { logger } from '../../core/logger/logger';
import { IUsersRepository, usersRepo } from '../../data/repositories/users.repository';
import * as bcryptjs from 'bcryptjs';
import { IUser } from '../../domain/users/user';
import { CreateUserTokensUseCaseType, createUserTokensUseCase } from './createUserTokens.usecase';
import { ILoginPayload } from '../../domain/auth/login';
import { trimAndValidateSchemaPayload } from '../../utils/validation/validate.schema';
import loginSchema from '../../presenters/schemas/auth/login.schema';
import {
  ACCOUNT_NOT_FOUND_ERROR_MESSAGE,
  BAD_LOGIN_CREDENTIALS_ERROR_MESSAGE,
} from '../../domain/auth/errors';

export type LoginUseCaseType = (
  payload: ILoginPayload,
) => Promise<{ user: IUser; accessToken: string; refreshToken: string }>;

export const loginUseCaseBase =
  (dependencies: {
    usersRepo: IUsersRepository;
    createUserTokensUseCase: CreateUserTokensUseCaseType;
  }) =>
  async (loginData: ILoginPayload) => {
    validateLoginPayload(loginData);
    const userFound = await dependencies.usersRepo.findOne({
      where: {
        email: loginData.email,
      },
    });
    if (!userFound) {
      exceptionService.notFoundException({
        message: ACCOUNT_NOT_FOUND_ERROR_MESSAGE,
      });
    }
    const userPassword = await usersRepo.getUserPassword(userFound);
    if (!bcryptjs.compareSync(loginData.password, userPassword)) {
      exceptionService.badRequestException({
        message: BAD_LOGIN_CREDENTIALS_ERROR_MESSAGE,
      });
    }
    logger.log('LOGIN USE CASE', JSON.stringify(userFound));
    const tokens = await dependencies.createUserTokensUseCase(userFound);
    return {
      user: userFound,
      ...tokens,
    };
  };

export function validateLoginPayload(payload: ILoginPayload): boolean {
  trimAndValidateSchemaPayload<ILoginPayload>(loginSchema, payload);
  return true;
}
export const loginUseCase: LoginUseCaseType = loginUseCaseBase({
  usersRepo,
  createUserTokensUseCase,
});
