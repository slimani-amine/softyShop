import {
  IAddressRepository,
  addressRepo,
} from "../../../data/repositories/addresses.repository";
import { exceptionService } from "../../../core/errors/exceptions";

export type DeleteAddressUseCaseType = (queryParams: {
  [id: string]: any;
}) => Promise<number>;

export const deleteAddressUseCaseBase =
  (dependencies: { addressRepo: IAddressRepository }) =>
  async (queryParams: { [id: string]: any }) => {
    const address = await dependencies.addressRepo.findOne({
      where: { id: queryParams.id },
    });

    if (!address) {
      exceptionService.notFoundException({
        message: "Address not found",
      });
    }

    const addressesFound =
      await dependencies.addressRepo.deleteAddress(address);

    return addressesFound;
  };

export const deleteAddressUseCase = deleteAddressUseCaseBase({
  addressRepo: addressRepo,
});
