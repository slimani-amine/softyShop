import { IStore } from 'app/src/v1/domain/store/store';
import { IStoreRepository, storeRepo } from '../../../data/repositories/store.reposotory';

export type GetOneStoreUseCaseType = (queryParams: {
  [id: string]: any;
}) => Promise<IStore>;

export const getOneStoreUseCaseBase =
  (dependencies: { storeRepo: IStoreRepository }) => async (queryParams: { [id: string]: any }) => {
    const storesFound = await dependencies.storeRepo.findOne({ where: { id: queryParams.id } });

    return storesFound;
  };

export const getOneStoreUseCase = getOneStoreUseCaseBase({ storeRepo: storeRepo });
