import { ICart } from "../cart/cart";
import { IIdAsNumber, NumberId } from "../types/idAsNumber";

export interface IOrder extends IIdAsNumber {
  id: string;
  status: "processing" | "on_delivery" | "livered" | "cancelled";
  cart?: ICart;
  address: string;
  date: Date;
  estimatedDeliveryDate: Date;
  paymentMethod_id?: string;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class Order extends NumberId implements IOrder {
  id: string;
  status: "processing" | "on_delivery" | "livered" | "cancelled";
  cart?: ICart;
  address: string;
  date: Date;
  estimatedDeliveryDate: Date;
  paymentMethod_id?: string;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(payload: {
    id: string;
    status: "processing" | "on_delivery" | "livered" | "cancelled";
    cart?: ICart;
    address: string;
    date: Date;
    estimatedDeliveryDate: Date;
    paymentMethod_id?: string;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
  }) {
    super(payload.id);
    this.status = payload.status;
    this.cart = payload.cart;
    this.address = payload.address;
    this.date = payload.date;
    this.estimatedDeliveryDate = payload.estimatedDeliveryDate;
    this.deletedAt = payload.deletedAt;
    this.createdAt = payload.createdAt;
    this.updatedAt = payload.updatedAt;
  }
}

export interface ICreateOrderInput {
  cart_id?: string;
  address: string;
  date: Date;
  estimatedDeliveryDate: Date;
  paymentMethod_id?: string;
}
