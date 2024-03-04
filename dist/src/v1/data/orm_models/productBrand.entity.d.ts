import { QueryDeepPartialEntity, WhereEntityOptions, findManyType } from "../../../types/repos";
import { ProductEntity } from "./product.entity";
import { StoreEntity } from "./store.entity";
export declare class BrandEntity {
    id: string;
    name: string;
    logo: string;
    products: ProductEntity[];
    store: StoreEntity;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export type BrandWherePayload = WhereEntityOptions<BrandEntity>;
export type BrandUpdateDataPayload = QueryDeepPartialEntity<BrandEntity>;
export type BrandFindPayload = findManyType<BrandEntity>;
