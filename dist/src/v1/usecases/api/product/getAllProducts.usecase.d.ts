import { IProduct } from "app/src/v1/domain/product/product";
import { IProductRepository, productRepo } from "../../../data/repositories/product.repository";
import { QueryResult } from "../../../utils/querying/apiFeatures.util";
export type GetAllProductUseCaseType = (queryParams: {
    [key: string]: any;
}) => Promise<QueryResult<IProduct>>;
export declare const getAllProductUseCaseBase: (dependencies: {
    productRepo: IProductRepository;
}) => GetAllProductUseCaseType;
export declare const getAllProductUseCase: GetAllProductUseCaseType;
