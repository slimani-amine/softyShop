// getUserAddressesUseCase.ts
import { IAddress } from "../../../domain/addresses/addresses";
import { exceptionService } from "../../../core/errors/exceptions";

import { usersRepo } from "../../../data/repositories/users.repository";
import { IUser } from "../../../domain/users/user";
import {
  IAddressRepository,
  addressRepo,
} from "../../../data/repositories/addresses.repository";

export type GetUserAddressesUseCaseType = (queryParams: {
  userId: string;
}) => Promise<IAddress[]>;

export const getUserAddressesUseCaseBase =
  (dependencies: { addressRepo: IAddressRepository }) =>
  async (queryParams: { userId: string }): Promise<IAddress[]> => {
    const UserId = queryParams.userId;
    const user = (await usersRepo.findOne({
      where: { id: UserId },
    })) as IUser;

    if (!user) {
      exceptionService.notFoundException({
        message: "User not found",
      });
    }

    const addressesFound = await dependencies.addressRepo.findMyAddresses({
      where: { user: { id: UserId } },
    });

    return addressesFound;
  };

export const getUserAddressesUseCase = getUserAddressesUseCaseBase({
  addressRepo: addressRepo,
});
