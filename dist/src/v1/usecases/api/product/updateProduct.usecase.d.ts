import { IProduct } from "app/src/v1/domain/product/product";
import { IProductRepository } from "../../../data/repositories/product.repository";
export type UpdateProductUseCaseType = (product: IProduct, updatePayload: Partial<IProduct>) => Promise<IProduct>;
export declare const updateProductUseCaseBase: (productRepository: IProductRepository) => (product: IProduct, updatePayload: Partial<IProduct>) => Promise<IProduct>;
export declare const updateProductUseCase: UpdateProductUseCaseType;
