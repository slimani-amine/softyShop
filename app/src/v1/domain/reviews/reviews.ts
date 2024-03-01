import { IProduct } from "../store/store";
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

export class Review extends NumberId implements IReview {
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
  }) {
    super(payload.id);
    this.review = payload.review;
    this.rating = payload.rating;
    this.user = payload.user;
    this.product = payload.product;
    this.deletedAt = payload.deletedAt;
    this.createdAt = payload.createdAt;
    this.updatedAt = payload.updatedAt;
  }
}

export interface ICreateReviewInput {
  review: string;
  rating: number;
  userId?: string;
  productId?: string;
}