import { IProductRepository, productRepo } from "../../../data/repositories/Product.repository";
import { IProduct } from "app/src/v1/domain/product/product";
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
