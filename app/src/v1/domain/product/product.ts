import { IBrand } from "../brand/brand";
import { ICartProduct } from "../cartProduct/cartProduct";
import { ICategory } from "../category/category";
import { IProductCreator } from "../productCreator/productCreator";
import { IReview } from "../reviews/reviews";
import { IStore } from "../store/store";
import { IIdAsNumber, NumberId } from "../types/idAsNumber";
import { IWishlist } from "../wishlist/wishlist";

export interface IProduct extends IIdAsNumber {
  id: string;
  name: string;
  price: number;
  stockNumber: number;
  publishedAt: Date;
  availability: boolean;
  isPublished: boolean;
  isAccepted: boolean;
  creator?: IProductCreator;
  brand?: IBrand;
  reviews?: IReview[];
  wishlist?: IWishlist[];
  cartProducts?: ICartProduct[];
  store?: IStore;
  category?: ICategory;
}

export class Product extends NumberId implements IProduct {
  id: string;
  name: string;
  price: number;
  stockNumber: number;
  publishedAt: Date;
  availability: boolean;
  isPublished: boolean;
  isAccepted: boolean;
  creator?: IProductCreator;
  brand?: IBrand;
  reviews?: IReview[];
  wishlist?: IWishlist[];
  cartProducts?: ICartProduct[];
  store?: IStore;
  category?: ICategory;

  constructor(payload: {
    id: string;
    name: string;
    price: number;
    stockNumber: number;
    publishedAt: Date;
    availability: boolean;
    isPublished: boolean;
    isAccepted: boolean;
    creator?: IProductCreator;
    brand?: IBrand;
    reviews?: IReview[];
    wishlist?: IWishlist[];
    cartProducts?: ICartProduct[];
    store?: IStore;
    category?: ICategory;
  }) {
    super(payload.id);
    this.name = payload.name;
    this.price = payload.price;
    this.stockNumber = payload.stockNumber;
    this.publishedAt = payload.publishedAt;
    this.availability = payload.availability;
    this.isPublished = payload.isPublished;
    this.isAccepted = payload.isAccepted;
    this.creator = payload.creator;
    this.brand = payload.brand;
    this.reviews = payload.reviews || [];
    this.wishlist = payload.wishlist || [];
    this.cartProducts = payload.cartProducts || [];
    this.store = payload.store;
    this.category = payload.category;
  }
}

export interface ICreateProductInput {
  name: string;
  price: number;
  stockNumber: number;
  publishedAt: Date;
  availability: boolean;
  isPublished: boolean;
  isAccepted: boolean;
  creator_id?: string;
  brand_id?: string;
  reviewIds?: string[];
  wishlistIds?: string[];
  cartProductIds?: string[];
  store_id?: string;
  category_id?: string;
}
