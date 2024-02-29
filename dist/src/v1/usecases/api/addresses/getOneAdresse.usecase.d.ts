import { IAddress } from "../../../domain/addresses/addresses";
import { IAddressRepository, addressRepo } from "../../../data/repositories/addresses.repository";
export type GetOneAddressUseCaseType = (queryParams: {
    [id: string]: any;
}) => Promise<IAddress>;
export declare const getOneAddressUseCaseBase: (dependencies: {
    addressRepo: IAddressRepository;
}) => (queryParams: {
    [id: string]: any;
}) => Promise<IAddress>;
export declare const getOneAddressUseCase: (queryParams: {
    [id: string]: any;
}) => Promise<IAddress>;
