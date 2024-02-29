import { IAddressRepository, addressRepo } from "../../../data/repositories/addresses.repository";
export type DeleteAddressUseCaseType = (queryParams: {
    [id: string]: any;
}) => Promise<number>;
export declare const deleteAddressUseCaseBase: (dependencies: {
    addressRepo: IAddressRepository;
}) => (queryParams: {
    [id: string]: any;
}) => Promise<number>;
export declare const deleteAddressUseCase: (queryParams: {
    [id: string]: any;
}) => Promise<number>;
