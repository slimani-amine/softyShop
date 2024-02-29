import { IAddress } from "../../../domain/addresses/addresses";
import { exceptionService } from "../../../core/errors/exceptions";
import {
  IAddressRepository,
  addressRepo,
} from "../../../data/repositories/addresses.repository";
import { AddressesEntity } from "../../../data/orm_models/addresses.entity";

export type UpdateAddressUseCaseType = (
  address: IAddress,
  updatePayload: Partial<IAddress>
) => Promise<IAddress>;

export const updateAddressUseCaseBase =
  (addressRepository: IAddressRepository) =>
  async (address: IAddress, updatePayload: Partial<IAddress>) => {
    console.log("🚀 ~ updatePayload:", updatePayload);

    const updatedAddress = await addressRepository.updateAddress(
      address,
      updatePayload as any
    );

    if (!updatedAddress) {
      exceptionService.notFoundException({
        message: "Address not found",
      });
    }

    return updatedAddress;
  };

export const updateAddressUseCase: UpdateAddressUseCaseType =
  updateAddressUseCaseBase(addressRepo);
