import { ICartRepository, cartRepo } from "../../../data/repositories/cart.repsitory";
import { ICart } from "../../../domain/cart/cart";
export type GetCartUseCaseType = (queryParams: {
    cartId: string;
}) => Promise<ICart>;
export declare const getCartUseCaseBase: (dependencies: {
    cartRepo: ICartRepository;
}) => (queryParams: {
    cartId: string;
}) => Promise<ICart>;
export declare const getCartUseCase: (queryParams: {
    cartId: string;
}) => Promise<ICart>;
