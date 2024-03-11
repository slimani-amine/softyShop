import { QueryDeepPartialEntity, WhereEntityOptions, findManyType } from "../../../types/repos";
import { UserEntity } from "./user.entity";
import { OrderEntity } from "./orders.entity";
export declare class AddressesEntity {
    id: string;
    address: string;
    phoneNumber: string;
    city: string;
    state: string;
    zipCode: number;
    user: UserEntity;
    order: OrderEntity[];
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export type AddressesWherePayload = WhereEntityOptions<AddressesEntity>;
export type AddressesUpdateDataPayload = QueryDeepPartialEntity<AddressesEntity>;
export type AddressesFindPayload = findManyType<AddressesEntity>;
