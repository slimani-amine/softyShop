import { IStore } from 'app/src/v1/domain/store/store';
import { IStoreRepository, storeRepo } from '../../../data/repositories/store.reposotory';
import { QueryResult } from '../../../utils/querying/apiFeatures.util';
export type GetAllStoreUseCaseType = (queryParams: {
    [key: string]: any;
}) => Promise<QueryResult<IStore>>;
export declare const getAllStoreUseCaseBase: (dependencies: {
    storeRepo: IStoreRepository;
}) => (queryParams: {
    [key: string]: any;
}) => Promise<QueryResult<IStore>>;
export declare const getAllStoreUseCase: (queryParams: {
    [key: string]: any;
}) => Promise<QueryResult<IStore>>;
