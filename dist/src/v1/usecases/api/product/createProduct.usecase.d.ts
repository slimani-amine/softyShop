import { IProductRepository, productRepo } from "../../../data/repositories/product.repository";
import { ICreateProductInput, IProduct } from "../../../domain/product/product";
export type createProductUseCaseType = (payload: ICreateProductInput) => Promise<{
    product: IProduct;
}>;
export declare const createProductUseCaseBase: (dependencies?: {
    productRepo: IProductRepository;
}) => createProductUseCaseType;
export declare function validateCreateProductPayload(payload: ICreateProductInput): ICreateProductInput;
export declare const createProductUseCase: createProductUseCaseType;
