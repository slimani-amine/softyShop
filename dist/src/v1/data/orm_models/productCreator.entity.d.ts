import { QueryDeepPartialEntity, WhereEntityOptions, findManyType } from "../../../types/repos";
import { ProductEntity } from "./product.entity";
import { StoreEntity } from "./store.entity";
export declare class ProductCreatorEntity {
    id: string;
    name: string;
    products: ProductEntity[];
    store: StoreEntity;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export type ProductCreatorWherePayload = WhereEntityOptions<ProductCreatorEntity>;
export type ProductCreatorUpdateDataPayload = QueryDeepPartialEntity<ProductCreatorEntity>;
export type ProductCreatorFindPayload = findManyType<ProductCreatorEntity>;
