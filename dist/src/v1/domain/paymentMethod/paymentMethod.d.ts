import { IIdAsNumber, NumberId } from "../types/idAsNumber";
export interface IPaymentMethod extends IIdAsNumber {
    id: string;
    name: string;
}
export declare class PaymentMethod extends NumberId implements IPaymentMethod {
    id: string;
    name: string;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    constructor(payload: {
        id: string;
        name: string;
    });
}
export interface ICreatePaymentMethodInput {
    name: string;
}
