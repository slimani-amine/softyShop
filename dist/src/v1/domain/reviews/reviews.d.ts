import { IProduct } from "../product/product";
import { IIdAsNumber, NumberId } from "../types/idAsNumber";
import { IUser } from "../users/user";
export interface IReview extends IIdAsNumber {
    id: string;
    review: string;
    rating: number;
    user?: IUser;
    product?: IProduct;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare class Review extends NumberId implements IReview {
    id: string;
    review: string;
    rating: number;
    user?: IUser;
    product?: IProduct;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    constructor(payload: {
        id: string;
        review: string;
        rating: number;
        user?: IUser;
        product?: IProduct;
        deletedAt: Date;
        createdAt: Date;
        updatedAt: Date;
    });
}
export interface ICreateReviewInput {
    review: string;
    rating: number;
    userId?: string;
    productId?: string;
}
