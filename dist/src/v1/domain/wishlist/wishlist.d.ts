import { IProduct } from "../product/product";
import { IIdAsNumber, NumberId } from "../types/idAsNumber";
import { IUser } from "../users/user";
export interface IWishlist extends IIdAsNumber {
    id: string;
    user?: IUser;
    product?: IProduct;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare class Wishlist extends NumberId implements IWishlist {
    id: string;
    user?: IUser;
    product?: IProduct;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    constructor(payload: {
        id: string;
        user?: IUser;
        product?: IProduct;
        deletedAt: Date;
        createdAt: Date;
        updatedAt: Date;
    });
}
export interface ICreateWishlistInput {
    userId?: string;
    productId?: string;
}
