import {
  IStoreRepository,
  storeRepo,
} from "../../../data/repositories/store.repository";
import { IStore } from "../../../domain/store/store";

export type UpdateStoreUseCaseType = (
  store: IStore,
  updatePayload: Partial<IStore>
) => Promise<IStore>;

export const updateStoreUseCaseBase =
  (storeRepository: IStoreRepository) =>
  async (store: IStore, updatePayload: Partial<IStore>) => {
    if (updatePayload.socialMediaLinks) {
      updatePayload.socialMediaLinks = JSON.stringify(
        updatePayload.socialMediaLinks
      );
    }
    if (updatePayload.location) {
      updatePayload.location = JSON.stringify(updatePayload.location);
    }

    const updatedStore = await storeRepository.updateStore(
      store,
      updatePayload
    );
    return updatedStore;
  };

export const updateStoreUseCase: UpdateStoreUseCaseType =
  updateStoreUseCaseBase(storeRepo);
