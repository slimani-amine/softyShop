import { IAddress, ICreateAddressInput } from "../../../domain/addresses/addresses";
import { IAddressRepository, addressRepo } from "../../../data/repositories/addresses.repository";
export type createAddressUseCaseType = (payload: ICreateAddressInput) => Promise<{
    address: IAddress;
}>;
export declare const createAddressUseCaseBase: (dependencies?: {
    addressRepo: IAddressRepository;
}) => createAddressUseCaseType;
export declare function validateCreateAddressPayload(payload: ICreateAddressInput): ICreateAddressInput;
export declare const createAddressUseCase: createAddressUseCaseType;
