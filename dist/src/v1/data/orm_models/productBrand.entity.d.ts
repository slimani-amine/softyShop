import { QueryDeepPartialEntity, WhereEntityOptions, findManyType } from "../../../types/repos";
import { ProductEntity } from "./product.entity";
export declare class BrandEntity {
    id: string;
    name: string;
    logo: string;
    product: ProductEntity;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export type BrandWherePayload = WhereEntityOptions<BrandEntity>;
export type BrandUpdateDataPayload = QueryDeepPartialEntity<BrandEntity>;
export type BrandFindPayload = findManyType<BrandEntity>;
