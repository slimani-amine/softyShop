import { IStore } from 'app/src/v1/domain/store/store';
import { IStoreRepository, storeRepo } from '../../../data/repositories/store.reposotory';
import { QueryResult } from '../../../utils/querying/apiFeatures.util';

export type DeleteStoreUseCaseType = (queryParams: {
  [id: string]: any;
}) => Promise<number>;

export const deleteStoreUseCaseBase =
  (dependencies: { storeRepo: IStoreRepository }) => async (queryParams: { [id: string]: any }) => {
    const storesFound = await dependencies.storeRepo.deleteStore(queryParams.id);

    return storesFound;
  };

export const deleteStoreUseCase = deleteStoreUseCaseBase({ storeRepo: storeRepo });
