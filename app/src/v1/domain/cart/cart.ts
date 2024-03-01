import { ICartProduct } from "../cartProduct/cartProduct";
import { IOrder } from "../order/order";
import { IPaymentMethod } from "../paymentMethod/paymentMethod";
import { IIdAsNumber, NumberId } from "../types/idAsNumber";

export interface ICart extends IIdAsNumber {
  id: string;
  totalQuantity: number;
  totalAmount: number;
  address: string;
  date: Date;
  estimatedDeliveryDate: Date;
  cartProduct?: ICartProduct[];
  order?: IOrder[];
  paymentMethod?: IPaymentMethod;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class Cart extends NumberId implements ICart {
  id: string;
  totalQuantity: number;
  totalAmount: number;
  address: string;
  date: Date;
  estimatedDeliveryDate: Date;
  cartProduct?: ICartProduct[];
  order?: IOrder[];
  paymentMethod?: IPaymentMethod;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(payload: {
    id: string;
    totalQuantity: number;
    totalAmount: number;
    address: string;
    date: Date;
    estimatedDeliveryDate: Date;
    cartProduct?: ICartProduct[];
    order?: IOrder[];
    paymentMethod?: IPaymentMethod;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
  }) {
    super(payload.id);
    this.totalQuantity = payload.totalQuantity;
    this.totalAmount = payload.totalAmount;
    this.address = payload.address;
    this.date = payload.date;
    this.estimatedDeliveryDate = payload.estimatedDeliveryDate;
    this.cartProduct = payload.cartProduct;
    this.order = payload.order;
    this.paymentMethod = payload.paymentMethod;
    this.deletedAt = payload.deletedAt;
    this.createdAt = payload.createdAt;
    this.updatedAt = payload.updatedAt;
  }
}

export interface ICreateCartInput {
  totalQuantity: number;
  totalAmount: number;
  address: string;
  date: Date;
  estimatedDeliveryDate: Date;
  paymentMethodId?: string;
}
