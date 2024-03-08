import { ICartProductRepository, cartProductRepo } from "../../../data/repositories/cartProduct.repository";
import { ICreateCartProductInput } from "../../../domain/cartProduct/cartProduct";
export type AddProductToCartUseCaseType = (payload: ICreateCartProductInput) => Promise<{
    cartProduct: any;
}>;
export declare const addProductToCartUseCaseBase: (dependencies?: {
    cartProductRepo: ICartProductRepository;
}) => AddProductToCartUseCaseType;
export declare function validateCreateCartProductPayload(payload: ICreateCartProductInput): ICreateCartProductInput;
export declare const addProductToCartUseCase: AddProductToCartUseCaseType;
