import { QueryDeepPartialEntity, WhereEntityOptions, findManyType } from "../../../types/repos";
import { OrderEntity } from "./orders.entity";
export declare class PaymentMethodEntity {
    id: string;
    name: string;
    icon: string;
    paymentMethods: OrderEntity[];
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export type PaymentMethodWherePayload = WhereEntityOptions<PaymentMethodEntity>;
export type PaymentMethodUpdateDataPayload = QueryDeepPartialEntity<PaymentMethodEntity>;
export type PaymentMethodFindPayload = findManyType<PaymentMethodEntity>;
