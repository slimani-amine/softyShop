import { QueryDeepPartialEntity, WhereEntityOptions, findManyType } from '../../../types/repos';
import { UserEntity } from './user.entity';
export declare class PaymentMethodEntity {
    id: number;
    name: string;
    user: UserEntity;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export type PaymentMethodWherePayload = WhereEntityOptions<PaymentMethodEntity>;
export type PaymentMethodUpdateDataPayload = QueryDeepPartialEntity<PaymentMethodEntity>;
export type PaymentMethodFindPayload = findManyType<PaymentMethodEntity>;
