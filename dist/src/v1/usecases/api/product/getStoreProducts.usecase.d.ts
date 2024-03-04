import { IProduct } from "../../../domain/Product/Product";
import { IProductRepository, productRepo } from "../../../data/repositories/Product.repository";
export type GetStoreProductUseCaseType = (queryParams: {
    storeId: string;
}) => Promise<IProduct[]>;
export declare const getStoreProductUseCaseBase: (dependencies: {
    productRepo: IProductRepository;
}) => (queryParams: {
    storeId: string;
}) => Promise<IProduct[]>;
export declare const getStoreProductUseCase: (queryParams: {
    storeId: string;
}) => Promise<IProduct[]>;
