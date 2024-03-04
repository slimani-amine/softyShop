import { IProductCreatorRepository, productCreatorRepo } from "../../../data/repositories/productCreator.repository";
import { IProductCreator } from "../../../domain/productCreator/productCreator";
export type GetStoreProductCreatorUseCaseType = (queryParams: {
    storeId: string;
}) => Promise<IProductCreator[]>;
export declare const getStoreProductCreatorUseCaseBase: (dependencies: {
    productCreatorRepo: IProductCreatorRepository;
}) => (queryParams: {
    storeId: string;
}) => Promise<IProductCreator[]>;
export declare const getStoreProductCreatorUseCase: (queryParams: {
    storeId: string;
}) => Promise<IProductCreator[]>;
