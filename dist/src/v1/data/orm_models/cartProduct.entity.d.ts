import { QueryDeepPartialEntity, WhereEntityOptions, findManyType } from '../../../types/repos';
import { ProductEntity } from './product.entity';
import { CartEntity } from './cart.entity';
export declare class CartProductEntity {
    id: string;
    quantity: number;
    product: ProductEntity;
    cart: CartEntity;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export type CartProductWherePayload = WhereEntityOptions<CartProductEntity>;
export type CartProductUpdateDataPayload = QueryDeepPartialEntity<CartProductEntity>;
export type CartProductFindPayload = findManyType<CartProductEntity>;
