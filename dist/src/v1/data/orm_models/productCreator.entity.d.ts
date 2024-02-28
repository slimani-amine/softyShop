import { QueryDeepPartialEntity, WhereEntityOptions, findManyType } from '../../../types/repos';
import { ProductEntity } from './product.entity';
export declare class ProductCreatorEntity {
    id: number;
    name: string;
    nationality: string;
    dateOfBirth: Date;
    product: ProductEntity;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export type ProductCreatorWherePayload = WhereEntityOptions<ProductCreatorEntity>;
export type ProductCreatorUpdateDataPayload = QueryDeepPartialEntity<ProductCreatorEntity>;
export type ProductCreatorFindPayload = findManyType<ProductCreatorEntity>;
