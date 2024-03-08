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
export declare class Order extends NumberId implements IOrder {
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
    });
}
export interface ICreateOrderInput {
    cart_id?: string;
    address: string;
    date: Date;
    estimatedDeliveryDate: Date;
    paymentMethod_id?: string;
}
