import { exceptionService } from "../../../core/errors/exceptions";
import {
  IStoreRepository,
  storeRepo,
} from "../../../data/repositories/store.repository";

export type DeleteStoreUseCaseType = (queryParams: {
  [id: string]: any;
}) => Promise<number>;

export const deleteStoreUseCaseBase =
  (dependencies: { storeRepo: IStoreRepository }) =>
  async (queryParams: { [id: string]: any }) => {
    const store = await dependencies.storeRepo.findOne({
      where: { id: queryParams.id },
    });

    if (!store) {
      exceptionService.notFoundException({
        message: "Store not found",
      });
    }

    const storesFound = await dependencies.storeRepo.deleteStore(store);

    return storesFound;
  };

export const deleteStoreUseCase = deleteStoreUseCaseBase({
  storeRepo: storeRepo,
});
