import {
  QueryDeepPartialEntity,
  WhereEntityOptions,
  findManyType,
} from "../../../types/repos";
import { UserEntity } from "./user.entity";
import { ProductEntity } from "./product.entity";
import { BrandEntity } from "./productBrand.entity";
import { ProductCreatorEntity } from "./productCreator.entity";
export declare class StoreEntity {
  id: string;
  name: string;
  phoneNumber: string;
  logo: string;
  isPublished: boolean;
  location: string;
  address: string;
  socialMediaLinks: string;
  products: ProductEntity[];
  brands: BrandEntity[];
  productCreators: ProductCreatorEntity[];
  user: UserEntity;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
export type StoresWherePayload = WhereEntityOptions<StoreEntity>;
export type StoresUpdateDataPayload = QueryDeepPartialEntity<StoreEntity>;
export type StoresFindPayload = findManyType<StoreEntity>;
