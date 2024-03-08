import { CartProductEntity } from "../../data/orm_models/cartProduct.entity";
import { IIdAsNumber, NumberId } from "../types/idAsNumber";
export interface ICart extends IIdAsNumber {
    id: string;
    totalQuantity: number;
    totalAmount: number;
    cartProducts?: CartProductEntity[];
}
export declare class Cart extends NumberId implements ICart {
    id: string;
    totalQuantity: number;
    totalAmount: number;
    cartProducts?: CartProductEntity[];
    constructor(payload: {
        id: string;
        totalQuantity: number;
        totalAmount: number;
        cartProducts?: CartProductEntity[];
    });
}
