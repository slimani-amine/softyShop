import { IAddress } from "../addresses/addresses";
import { ICart } from "../cart/cart";
import { IPaymentMethod } from "../paymentMethod/paymentMethod";
import { IIdAsNumber, NumberId } from "../types/idAsNumber";

export interface IOrder extends IIdAsNumber {
  id: string;
  estimatedDeliveryDate: Date;
  status: string;
  isPaied?: boolean;
  paymentMethod?: IPaymentMethod; 
  address?: IAddress; 
  cart?: ICart; 
}

export class Order extends NumberId implements IOrder {
  id: string;
  estimatedDeliveryDate: Date;
  status: string;
  isPaied?: boolean;
  paymentMethod?: IPaymentMethod; 
  address?: IAddress;
  cart?: ICart; 

  constructor(payload: {
    id: string;
    estimatedDeliveryDate: Date;
    status: string;
    isPaied?: boolean;
    paymentMethod?: IPaymentMethod;
    address?: IAddress;
    cart?: ICart;
  }) {
    super(payload.id);
    this.estimatedDeliveryDate = payload.estimatedDeliveryDate;
    this.status = payload.status;
    this.isPaied = payload.isPaied;
    this.paymentMethod = payload.paymentMethod;
    this.address = payload.address;
    this.cart = payload.cart;
  }
}

export interface ICreateOrderInput {
  paymentMethod_id?: string;
  address_id?: string;
  cartId: string;
  userId: string;
}
