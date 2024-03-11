import { IStoreRepository } from "../../../data/repositories/store.repository";
import { IStore } from "../../../domain/store/store";
export type PublishStoreUseCaseType = (store: IStore, updatePayload: Partial<IStore>) => Promise<IStore>;
export declare const publishStoreUseCaseBase: (storeRepository: IStoreRepository) => (store: IStore, updatePayload: Partial<IStore>) => Promise<IStore>;
export declare const publishStoreUseCase: PublishStoreUseCaseType;
