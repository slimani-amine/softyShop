import { ICart } from "../cart/cart";
import { IProduct } from "../product/product";
import { IIdAsNumber, NumberId } from "../types/idAsNumber";

export interface ICartProduct extends IIdAsNumber {
  id: string;
  quantity?: number;
  product?: IProduct;
  cart?: ICart;
}

export class CartProduct extends NumberId implements ICartProduct {
  id: string;
  quantity: number;
  product?: IProduct;
  cart?: ICart;

  constructor(payload: {
    id: string;
    quantity: number;
    product?: IProduct;
    cart?: ICart;
  }) {
    super(payload.id);
    this.quantity = payload.quantity;
    this.product = payload.product;
    this.cart = payload.cart;
  }
}

export interface ICreateCartProductInput {
  quantity?: number;
  productId?: string;
  cartId?: string;
}
