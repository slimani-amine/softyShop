import { IStore } from "../../../domain/store/store";
import { IStoreRepository, storeRepo } from "../../../data/repositories/store.repository";
export type GetVendorStoresUseCaseType = (queryParams: {
    userId: string;
}) => Promise<IStore[]>;
export declare const getVendorStoresUseCaseBase: (dependencies: {
    storeRepo: IStoreRepository;
}) => (queryParams: {
    userId: string;
}) => Promise<IStore[]>;
export declare const getVendorStoresUseCase: (queryParams: {
    userId: string;
}) => Promise<IStore[]>;
