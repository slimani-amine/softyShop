import { IStore } from "app/src/v1/domain/store/store";
import { IStoreRepository, storeRepo } from "../../../data/repositories/store.repository";
export type GetOneStoreUseCaseType = (queryParams: {
    [id: string]: any;
}) => Promise<IStore>;
export declare const getOneStoreUseCaseBase: (dependencies: {
    storeRepo: IStoreRepository;
}) => (queryParams: {
    [id: string]: any;
}) => Promise<IStore>;
export declare const getOneStoreUseCase: (queryParams: {
    [id: string]: any;
}) => Promise<IStore>;
