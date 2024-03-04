import { IBrandRepository } from "../../../data/repositories/brand.repository";
import { IBrand } from "../../../domain/brand/brand";
export type GetStoreBrandsUseCaseType = (queryParams: {
    storeId: string;
}) => Promise<IBrand[]>;
export declare const getStoreBrandsUseCaseBase: (dependencies: {
    brandsRepo: IBrandRepository;
}) => (queryParams: {
    storeId: string;
}) => Promise<IBrand[]>;
export declare const getStoreBrandsUseCase: (queryParams: {
    storeId: string;
}) => Promise<IBrand[]>;
