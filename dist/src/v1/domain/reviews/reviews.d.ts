import { IProduct } from "../product/product";
import { IIdAsNumber, NumberId } from "../types/idAsNumber";
import { IUser } from "../users/user";
export interface IReview extends IIdAsNumber {
    id: string;
    review: string;
    rating: number;
}
export declare class Review extends NumberId implements IReview {
    id: string;
    review: string;
    rating: number;
    user?: IUser;
    product?: IProduct;
    constructor(payload: {
        id: string;
        review: string;
        rating: number;
        user?: IUser;
        product?: IProduct;
    });
}
export interface ICreateReviewInput {
    review: string;
    rating: number;
    userId: string;
    productId: string;
}
