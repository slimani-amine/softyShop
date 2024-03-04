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
export declare class Order extends NumberId implements IOrder {
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
    });
}
