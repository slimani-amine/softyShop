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
export declare class Cart extends NumberId implements ICart {
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
    });
}
export interface ICreateCartInput {
    totalQuantity: number;
    totalAmount: number;
    address: string;
    date: Date;
    estimatedDeliveryDate: Date;
    paymentMethodId?: string;
}
