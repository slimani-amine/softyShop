import { ICart } from "../cart/cart";
import { IProduct } from "../product/product";
import { IIdAsNumber, NumberId } from "../types/idAsNumber";
export interface ICartProduct extends IIdAsNumber {
    id: string;
    quantity: number;
    product?: IProduct;
    cart?: ICart;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare class CartProduct extends NumberId implements ICartProduct {
    id: string;
    quantity: number;
    product?: IProduct;
    cart?: ICart;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    constructor(payload: {
        id: string;
        quantity: number;
        product?: IProduct;
        cart?: ICart;
        deletedAt: Date;
        createdAt: Date;
        updatedAt: Date;
    });
}
export interface ICreateCartProductInput {
    quantity: number;
    productId?: string;
    cartId?: string;
}
