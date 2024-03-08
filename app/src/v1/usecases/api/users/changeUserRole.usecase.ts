import { ACCOUNT_NOT_FOUND_ERROR_MESSAGE } from "../../../domain/auth/errors";
import { exceptionService } from "../../../core/errors/exceptions";
import {
  IUsersRepository,
  usersRepo,
} from "../../../data/repositories/users.repository";
import { IUser } from "../../../domain/users/user";

export type ChangeUserRoleUseCaseType = (
  userId: string,
  payload: Partial<IUser>
) => Promise<IUser>;

export const changeUserRoleUseCaseBase =
  (dependencies: { usersRepo: IUsersRepository }) =>
  async (userId: string, payload: Partial<IUser>) => {
    const userFound = await dependencies.usersRepo.findOne({
      where: {
        id: parseInt(userId),
      },
    });

    if (!userFound) {
      exceptionService.notFoundException({
        message: ACCOUNT_NOT_FOUND_ERROR_MESSAGE,
      });
    }

    const updatedUser = await dependencies.usersRepo.updateOne(userFound, {
      role: payload?.role,
    });

    return updatedUser;
  };

export const changeUserRoleUseCase: ChangeUserRoleUseCaseType =
  changeUserRoleUseCaseBase({
    usersRepo: usersRepo,
  });
