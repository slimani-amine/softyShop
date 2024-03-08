import { IStore } from "app/src/v1/domain/store/store";
import {
  IStoreRepository,
  storeRepo,
} from "../../../data/repositories/store.repository";
import { QueryResult } from "../../../utils/querying/apiFeatures.util";

export type GetAllStoreUseCaseType = (queryParams: {
  [key: string]: any;
}) => Promise<QueryResult<IStore>>;

export const getAllStoreUseCaseBase =
  (dependencies: { storeRepo: IStoreRepository }) =>
  async (queryParams: { [key: string]: any }) => {
    const storesFound = await dependencies.storeRepo.findByQuery(queryParams);
    return storesFound;
  };

export const getAllStoreUseCase = getAllStoreUseCaseBase({
  storeRepo: storeRepo,
});
