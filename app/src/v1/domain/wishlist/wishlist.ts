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

export class Wishlist extends NumberId implements IWishlist {
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
  }) {
    super(payload.id);
    this.user = payload.user;
    this.product = payload.product;
    this.deletedAt = payload.deletedAt;
    this.createdAt = payload.createdAt;
    this.updatedAt = payload.updatedAt;
  }
}

export interface ICreateWishlistInput {
  userId?: string;
  productId?: string;
}