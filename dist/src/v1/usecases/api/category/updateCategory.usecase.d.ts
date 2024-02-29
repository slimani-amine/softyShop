import { IStoreRepository } from "../../../data/repositories/store.repository";
import { IStore } from "../../../domain/store/store";
export type UpdateStoreUseCaseType = (store: IStore, updatePayload: Partial<IStore>) => Promise<IStore>;
export declare const updateStoreUseCaseBase: (storeRepository: IStoreRepository) => (store: IStore, updatePayload: Partial<IStore>) => Promise<IStore>;
export declare const updateStoreUseCase: UpdateStoreUseCaseType;
