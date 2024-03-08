import { ICart } from "../cart/cart";
import { IProduct } from "../product/product";
import { IIdAsNumber, NumberId } from "../types/idAsNumber";
export interface ICartProduct extends IIdAsNumber {
    id: string;
    quantity?: number;
    product?: IProduct;
    cart?: ICart;
}
export declare class CartProduct extends NumberId implements ICartProduct {
    id: string;
    quantity: number;
    product?: IProduct;
    cart?: ICart;
    constructor(payload: {
        id: string;
        quantity: number;
        product?: IProduct;
        cart?: ICart;
    });
}
export interface ICreateCartProductInput {
    quantity?: number;
    productId?: string;
    cartId?: string;
}
