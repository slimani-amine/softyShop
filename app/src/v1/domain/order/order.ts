import { ICart } from "../cart/cart";
import { IIdAsNumber, NumberId } from "../types/idAsNumber";

export interface IOrder extends IIdAsNumber {
  id: string;
  status: "processing" | "on_delivery" | "livered" | "cancelled";
  cart?: ICart;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class Order extends NumberId implements IOrder {
  id: string;
  status: "processing" | "on_delivery" | "livered" | "cancelled";
  cart?: ICart;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(payload: {
    id: string;
    status: "processing" | "on_delivery" | "livered" | "cancelled";
    cart?: ICart;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
  }) {
    super(payload.id);
    this.status = payload.status;
    this.cart = payload.cart;
    this.deletedAt = payload.deletedAt;
    this.createdAt = payload.createdAt;
    this.updatedAt = payload.updatedAt;
  }
}
