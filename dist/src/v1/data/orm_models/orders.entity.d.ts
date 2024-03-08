import { QueryDeepPartialEntity, WhereEntityOptions, findManyType } from "../../../types/repos";
import { CartEntity } from "./cart.entity";
import { PaymentMethodEntity } from "./paymentMethod.entity";
export declare class OrderEntity {
    id: string;
    address: string;
    date: Date;
    estimatedDeliveryDate: Date;
    paymentMethod: PaymentMethodEntity;
    status: string;
    cart: CartEntity;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export type OrderWherePayload = WhereEntityOptions<OrderEntity>;
export type OrderUpdateDataPayload = QueryDeepPartialEntity<OrderEntity>;
export type OrderFindPayload = findManyType<OrderEntity>;
