import { ICartProductRepository, cartProductRepo } from "../../../data/repositories/cartProduct.repository";
export type DeleteProductFromCartUseCaseType = (params: {
    [id: string]: any;
}) => Promise<{
    success: boolean;
}>;
export declare const deleteProductFromCartUseCaseBase: (dependencies?: {
    cartProductRepo: ICartProductRepository;
}) => DeleteProductFromCartUseCaseType;
export declare const deleteProductFromCartUseCase: DeleteProductFromCartUseCaseType;
