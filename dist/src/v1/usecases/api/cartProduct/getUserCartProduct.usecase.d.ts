import { ICartProductRepository, cartProductRepo } from "../../../data/repositories/cartProduct.repository";
import { ICart } from "../../../domain/cart/cart";
import { CartProductEntity } from "../../../data/orm_models/cartProduct.entity";
export type getUserCartProductUseCaseType = (queryParams: {
    cartId: string;
}) => Promise<(CartProductEntity[] | ICart)[]>;
export declare const getUserCartProductUseCaseBase: (dependencies: {
    cartProductRepo: ICartProductRepository;
}) => (queryParams: {
    cartId: string;
}) => Promise<(CartProductEntity[] | ICart)[]>;
export declare const getUserCartProductUseCase: (queryParams: {
    cartId: string;
}) => Promise<(CartProductEntity[] | ICart)[]>;
