import { QueryDeepPartialEntity, WhereEntityOptions, findManyType } from '../../../types/repos';
import { CartEntity } from './cart.entity';
export declare class OrderEntity {
    id: number;
    status: string;
    cart: CartEntity;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export type OrderWherePayload = WhereEntityOptions<OrderEntity>;
export type OrderUpdateDataPayload = QueryDeepPartialEntity<OrderEntity>;
export type OrderFindPayload = findManyType<OrderEntity>;
