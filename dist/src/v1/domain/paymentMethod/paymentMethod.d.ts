import { IIdAsNumber, NumberId } from "../types/idAsNumber";
export interface IPaymentMethod extends IIdAsNumber {
    id: string;
    name: string;
    icon: string;
}
export declare class PaymentMethod extends NumberId implements IPaymentMethod {
    id: string;
    name: string;
    icon: string;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    constructor(payload: {
        id: string;
        name: string;
        icon: string;
    });
}
export interface ICreatePaymentMethodInput {
    name: string;
    icon: string;
}
