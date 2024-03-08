import { IIdAsNumber, NumberId } from "../types/idAsNumber";
import { IUser } from "../users/user";
import { IProduct } from "../product/product";
export interface IWishlist extends IIdAsNumber {
    id: string;
}
export declare class Wishlist extends NumberId implements IWishlist {
    id: string;
    user?: IUser;
    product?: IProduct;
    constructor(payload: {
        id: string;
        user?: IUser;
        product?: IProduct;
    });
}
export interface ICreateWishlistInput {
    userId?: string;
    productId?: string;
}
