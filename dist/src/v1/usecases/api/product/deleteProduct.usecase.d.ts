import { IProductRepository, productRepo } from "../../../data/repositories/product.repository";
export type DeleteProductUseCaseType = (queryParams: {
    [id: string]: any;
}) => Promise<number>;
export declare const deleteProductUseCaseBase: (dependencies: {
    productRepo: IProductRepository;
}) => (queryParams: {
    [id: string]: any;
}) => Promise<number>;
export declare const deleteProductUseCase: (queryParams: {
    [id: string]: any;
}) => Promise<number>;
