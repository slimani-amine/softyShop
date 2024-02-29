import { IAddress } from "../../../domain/addresses/addresses";
import { IAddressRepository, addressRepo } from "../../../data/repositories/addresses.repository";
export type GetUserAddressesUseCaseType = (queryParams: {
    userId: string;
}) => Promise<IAddress[]>;
export declare const getUserAddressesUseCaseBase: (dependencies: {
    addressRepo: IAddressRepository;
}) => (queryParams: {
    userId: string;
}) => Promise<IAddress[]>;
export declare const getUserAddressesUseCase: (queryParams: {
    userId: string;
}) => Promise<IAddress[]>;
