import { QueryDeepPartialEntity, WhereEntityOptions, findManyType } from "../../../types/repos";
import { CartProductEntity } from "./cartProduct.entity";
import { OrderEntity } from "./orders.entity";
export declare class CartEntity {
    id: string;
    totalQuantity: number;
    totalAmount: number;
    cartProducts: CartProductEntity[];
    order: OrderEntity[];
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export type CartWherePayload = WhereEntityOptions<CartEntity>;
export type CartUpdateDataPayload = QueryDeepPartialEntity<CartEntity>;
export type CartFindPayload = findManyType<CartEntity>;
