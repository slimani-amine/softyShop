import { QueryDeepPartialEntity, WhereEntityOptions, findManyType } from '../../../types/repos';
import { UserEntity } from './user.entity';
import { ProductEntity } from './product.entity';
export declare class WishlistEntity {
    id: string;
    user: UserEntity;
    product: ProductEntity;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export type WishlistWherePayload = WhereEntityOptions<WishlistEntity>;
export type WishlistUpdateDataPayload = QueryDeepPartialEntity<WishlistEntity>;
export type WishlistFindPayload = findManyType<WishlistEntity>;
