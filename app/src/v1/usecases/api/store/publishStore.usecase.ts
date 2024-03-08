import {
  IStoreRepository,
  storeRepo,
} from "../../../data/repositories/store.repository";
import { IStore } from "../../../domain/store/store";

export type PublishStoreUseCaseType = (
  store: IStore,
  updatePayload: Partial<IStore>
) => Promise<IStore>;

export const publishStoreUseCaseBase =
  (storeRepository: IStoreRepository) =>
  async (store: IStore, updatePayload: Partial<IStore>) => {
    const updatedStore = await storeRepository.updateStore(store, {
      isPublished: updatePayload.isPublished,
    });
    return updatedStore;
  };

export const publishStoreUseCase: PublishStoreUseCaseType =
  publishStoreUseCaseBase(storeRepo);
