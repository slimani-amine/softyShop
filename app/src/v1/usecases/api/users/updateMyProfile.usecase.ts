import { ACCOUNT_NOT_FOUND_ERROR_MESSAGE } from "../../../domain/auth/errors";
import { exceptionService } from "../../../core/errors/exceptions";
import {
  IUsersRepository,
  usersRepo,
} from "../../../data/repositories/users.repository";
import { IUser } from "../../../domain/users/user";
import { IRequestUser } from "../../auth/types/IRequestUser";

export type UpdateMyProfileUseCaseType = (
  user: IRequestUser,
  payload: Partial<IUser>
) => Promise<IUser>;

export const updateMyProfileUseCaseBase =
  (dependencies: { usersRepo: IUsersRepository }) =>
  async (user: IRequestUser, payload: Partial<IUser>) => {
    const userFound = await dependencies.usersRepo.findOne({
      where: {
        id: user.id,
      },
    });

    if (!userFound) {
      exceptionService.notFoundException({
        message: ACCOUNT_NOT_FOUND_ERROR_MESSAGE,
      });
    }
    if (payload?.cart) {
      const updatedUser = await dependencies.usersRepo.updateOne(userFound, {
        email: payload?.email || userFound.email,
        picture: payload?.picture || userFound.picture,
        firstName: payload?.firstName || userFound.firstName,
        lastName: payload?.lastName || userFound.lastName,
        cart: { id: payload?.cart?.id },
      });

      return updatedUser;
    } else {
      const updatedUser = await dependencies.usersRepo.updateOne(userFound, {
        email: payload?.email || userFound.email,
        picture: payload?.picture || userFound.picture,
        firstName: payload?.firstName || userFound.firstName,
        lastName: payload?.lastName || userFound.lastName,
      });

      return updatedUser;
    }
  };

export const updateMyProfileUseCase: UpdateMyProfileUseCaseType =
  updateMyProfileUseCaseBase({
    usersRepo: usersRepo,
  });
