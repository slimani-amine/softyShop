import { QueryDeepPartialEntity, WhereEntityOptions, findManyType } from "../../../types/repos";
import { ProductEntity } from "./product.entity";
export declare class CategoryEntity {
    id: string;
    name: string;
    icon: string;
    product: ProductEntity[];
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export type CategoryWherePayload = WhereEntityOptions<CategoryEntity>;
export type CategoryUpdateDataPayload = QueryDeepPartialEntity<CategoryEntity>;
export type CategoryFindPayload = findManyType<CategoryEntity>;
