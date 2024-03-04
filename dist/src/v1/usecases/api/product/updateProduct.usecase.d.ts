import { IProductRepository } from "../../../data/repositories/product.repository";
import { IProduct } from "../../../domain/product/product";
export type UpdateProductUseCaseType = (product: IProduct, updatePayload: Partial<IProduct>) => Promise<IProduct>;
export declare const updateProductUseCaseBase: (productRepository: IProductRepository) => (product: IProduct, updatePayload: Partial<IProduct>) => Promise<IProduct>;
export declare const updateProductUseCase: UpdateProductUseCaseType;
