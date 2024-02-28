import { IStoreRepository, storeRepo } from '../../../data/repositories/store.reposotory';
import { ICreateStoreInput, IStore } from '../../../domain/store/store';
export type createStoreUseCaseType = (payload: ICreateStoreInput) => Promise<{
    store: IStore;
}>;
export declare const createStoreUseCaseBase: (dependencies?: {
    storeRepo: IStoreRepository;
}) => createStoreUseCaseType;
export declare function validatecreateStorePayload(payload: ICreateStoreInput): ICreateStoreInput;
export declare const createStoreUseCase: createStoreUseCaseType;
