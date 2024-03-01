import { IBrandRepository } from "../../../data/repositories/brand.repository";
import { IBrand } from "../../../domain/brand/brand";
export type GetProductBrandsUseCaseType = (queryParams: {
    storeId: string;
    productId: string;
}) => Promise<IBrand[]>;
export declare const getProductBrandsUseCaseBase: (dependencies: {
    brandsRepo: IBrandRepository;
}) => (queryParams: {
    storeId: string;
    productId: string;
}) => Promise<IBrand[]>;
export declare const getProductBrandsUseCase: (queryParams: {
    storeId: string;
    productId: string;
}) => Promise<IBrand[]>;
