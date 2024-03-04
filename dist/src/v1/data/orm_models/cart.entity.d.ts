import { QueryDeepPartialEntity, WhereEntityOptions, findManyType } from "../../../types/repos";
import { CartProductEntity } from "./cartProduct.entity";
import { OrderEntity } from "./orders.entity";
import { PaymentMethodEntity } from "./paymentMethod.entity";
export declare class CartEntity {
    id: string;
    totalQuantity: number;
    totalAmount: number;
    address: string;
    date: Date;
    estimatedDeliveryDate: Date;
    cartProduct: CartProductEntity[];
    order: OrderEntity[];
    paymentMethod: PaymentMethodEntity;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export type CartWherePayload = WhereEntityOptions<CartEntity>;
export type CartUpdateDataPayload = QueryDeepPartialEntity<CartEntity>;
export type CartFindPayload = findManyType<CartEntity>;
