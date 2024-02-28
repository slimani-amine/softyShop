import { QueryDeepPartialEntity, WhereEntityOptions, findManyType } from '../../../types/repos';
import { UserEntity } from './user.entity';
export declare class AddressesEntity {
    id: number;
    address: string;
    city: string;
    state: string;
    zipCode: number;
    user: UserEntity;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export type AddressesWherePayload = WhereEntityOptions<AddressesEntity>;
export type AddressesUpdateDataPayload = QueryDeepPartialEntity<AddressesEntity>;
export type AddressesFindPayload = findManyType<AddressesEntity>;
