import { IAddress } from "../../../domain/addresses/addresses";
import { exceptionService } from "../../../core/errors/exceptions";
import {
  IAddressRepository,
  addressRepo,
} from "../../../data/repositories/addresses.repository";

export type GetOneAddressUseCaseType = (queryParams: {
  [id: string]: any;
}) => Promise<IAddress>;

export const getOneAddressUseCaseBase =
  (dependencies: { addressRepo: IAddressRepository }) =>
  async (queryParams: { [id: string]: any }) => {
    const addressFound = await dependencies.addressRepo.findOne({
      where: { id: queryParams.id },
    });

    if (!addressFound) {
      exceptionService.notFoundException({
        message: "Address not found",
      });
    }

    return addressFound;
  };

export const getOneAddressUseCase = getOneAddressUseCaseBase({
  addressRepo: addressRepo,
});
