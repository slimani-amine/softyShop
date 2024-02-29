import { IStoreRepository, storeRepo } from "../../../data/repositories/store.repository";
export type DeleteStoreUseCaseType = (queryParams: {
    [id: string]: any;
}) => Promise<number>;
export declare const deleteStoreUseCaseBase: (dependencies: {
    storeRepo: IStoreRepository;
}) => (queryParams: {
    [id: string]: any;
}) => Promise<number>;
export declare const deleteStoreUseCase: (queryParams: {
    [id: string]: any;
}) => Promise<number>;
