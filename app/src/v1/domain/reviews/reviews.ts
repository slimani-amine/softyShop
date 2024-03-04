import { IProduct } from "../product/product";
import { IIdAsNumber, NumberId } from "../types/idAsNumber";
import { IUser } from "../users/user";

export interface IReview extends IIdAsNumber {
  id: string;
  review: string;
  rating: number;
}

export class Review extends NumberId implements IReview {
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
  }) {
    super(payload.id);
    this.review = payload.review;
    this.rating = payload.rating;
    this.user = payload.user;
    this.product = payload.product;
  }
}

export interface ICreateReviewInput {
  review: string;
  rating: number;
  userId: string;
  productId: string;
}
