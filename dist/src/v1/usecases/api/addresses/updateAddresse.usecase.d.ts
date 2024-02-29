import { IAddress } from "../../../domain/addresses/addresses";
import { IAddressRepository } from "../../../data/repositories/addresses.repository";
export type UpdateAddressUseCaseType = (address: IAddress, updatePayload: Partial<IAddress>) => Promise<IAddress>;
export declare const updateAddressUseCaseBase: (addressRepository: IAddressRepository) => (address: IAddress, updatePayload: Partial<IAddress>) => Promise<IAddress>;
export declare const updateAddressUseCase: UpdateAddressUseCaseType;
