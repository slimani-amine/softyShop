import { QueryDeepPartialEntity, WhereEntityOptions, findManyType } from '../../../types/repos';
import { CartEntity } from './cart.entity';
export declare class PaymentMethodEntity {
    id: string;
    name: string;
    icon: string;
    paymentMethods: CartEntity[];
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export type PaymentMethodWherePayload = WhereEntityOptions<PaymentMethodEntity>;
export type PaymentMethodUpdateDataPayload = QueryDeepPartialEntity<PaymentMethodEntity>;
export type PaymentMethodFindPayload = findManyType<PaymentMethodEntity>;
