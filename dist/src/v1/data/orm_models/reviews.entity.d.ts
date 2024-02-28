import { QueryDeepPartialEntity, WhereEntityOptions, findManyType } from '../../../types/repos';
import { UserEntity } from './user.entity';
import { ProductEntity } from './product.entity';
export declare class ReviewsEntity {
    id: number;
    review: string;
    rating: number;
    user: UserEntity;
    product: ProductEntity;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export type ReviewsWherePayload = WhereEntityOptions<ReviewsEntity>;
export type ReviewsUpdateDataPayload = QueryDeepPartialEntity<ReviewsEntity>;
export type ReviewsFindPayload = findManyType<ReviewsEntity>;
