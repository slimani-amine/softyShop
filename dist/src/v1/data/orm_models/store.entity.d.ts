import { QueryDeepPartialEntity, WhereEntityOptions, findManyType } from "../../../types/repos";
import { UserEntity } from "./user.entity";
import { ProductEntity } from "./product.entity";
export declare class StoreEntity {
    id: string;
    storeName: string;
    storePhone: string;
    logo: string;
    isPublished: boolean;
    position: string;
    socialMediaLinks: string;
    products: ProductEntity[];
    user: UserEntity;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export type StoresWherePayload = WhereEntityOptions<StoreEntity>;
export type StoresUpdateDataPayload = QueryDeepPartialEntity<StoreEntity>;
export type StoresFindPayload = findManyType<StoreEntity>;
