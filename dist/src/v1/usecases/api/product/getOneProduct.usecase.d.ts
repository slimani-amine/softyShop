import { IProduct } from "../../../domain/product/product";
import { IProductRepository, productRepo } from "../../../data/repositories/product.repository";
export type GetOneProductUseCaseType = (queryParams: {
    [id: string]: any;
}) => Promise<IProduct>;
export declare const getOneProductUseCaseBase: (dependencies: {
    productRepo: IProductRepository;
}) => (queryParams: {
    [id: string]: any;
}) => Promise<IProduct>;
export declare const getOneProductUseCase: (queryParams: {
    [id: string]: any;
}) => Promise<IProduct>;
