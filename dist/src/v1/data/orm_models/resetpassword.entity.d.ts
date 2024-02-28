import { UserEntity } from './user.entity';
import { QueryDeepPartialEntity, findManyType, WhereEntityOptions } from '../../../types/repos';
export declare class ResetPasswordEntity {
    id: number;
    token: string;
    user_id: number;
    user: UserEntity;
    expirationDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
export type ResetPasswordWherePayload = WhereEntityOptions<ResetPasswordEntity>;
export type ResetPasswordUpadteDataPayload = QueryDeepPartialEntity<ResetPasswordEntity>;
export type ResetPasswordFindPayload = findManyType<ResetPasswordEntity>;
