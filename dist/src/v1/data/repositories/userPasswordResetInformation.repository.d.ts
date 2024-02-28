import { ICreateUserPasswordResetInformation, IUserPasswordResetInformation } from '../../domain/users/user';
import { DataSource, QueryRunner } from 'typeorm';
import { ResetPasswordEntity, ResetPasswordFindPayload, ResetPasswordUpadteDataPayload } from '../orm_models/resetpassword.entity';
export declare const userPasswordResetInformationRepositoryBase: (dbConnection?: DataSource | QueryRunner) => {
    manager: import("typeorm").EntityManager;
    findOne(findData: ResetPasswordFindPayload): Promise<IUserPasswordResetInformation>;
    updateOne(userResetPasswordInformation: IUserPasswordResetInformation, payload: ResetPasswordUpadteDataPayload): Promise<IUserPasswordResetInformation>;
    deleteOne(userResetPasswordInformation: IUserPasswordResetInformation): Promise<number>;
    deleteMany(payload: Array<number>): Promise<number>;
    create(payload: ICreateUserPasswordResetInformation): Promise<IUserPasswordResetInformation>;
    toDomainUserResetPasswordInformations(usersResetPasswordsInformation: ResetPasswordEntity[]): IUserPasswordResetInformation[];
    toDomainUserResetPasswordInformation(prismaUserResetPasswordInformation: ResetPasswordEntity): IUserPasswordResetInformation;
};
export declare const userPasswordResetInformationRepository: {
    manager: import("typeorm").EntityManager;
    findOne(findData: ResetPasswordFindPayload): Promise<IUserPasswordResetInformation>;
    updateOne(userResetPasswordInformation: IUserPasswordResetInformation, payload: ResetPasswordUpadteDataPayload): Promise<IUserPasswordResetInformation>;
    deleteOne(userResetPasswordInformation: IUserPasswordResetInformation): Promise<number>;
    deleteMany(payload: Array<number>): Promise<number>;
    create(payload: ICreateUserPasswordResetInformation): Promise<IUserPasswordResetInformation>;
    toDomainUserResetPasswordInformations(usersResetPasswordsInformation: ResetPasswordEntity[]): IUserPasswordResetInformation[];
    toDomainUserResetPasswordInformation(prismaUserResetPasswordInformation: ResetPasswordEntity): IUserPasswordResetInformation;
};
export interface IUserPasswordResetInformationsRepository {
    findOne(findData: ResetPasswordFindPayload): Promise<IUserPasswordResetInformation>;
    updateOne(userResetPasswordInformation: IUserPasswordResetInformation, payload: ResetPasswordUpadteDataPayload): Promise<IUserPasswordResetInformation>;
    deleteOne(userResetPasswordInformation: IUserPasswordResetInformation): Promise<number>;
    deleteMany(payload: Array<number>): Promise<number>;
    create(payload: ICreateUserPasswordResetInformation): Promise<IUserPasswordResetInformation>;
}
export interface IUserPasswordResetInformationsRepositoryExtra extends IUserPasswordResetInformationsRepository {
    toDomainUserResetPasswordInformation(prismaUserResetPasswordInformation: ResetPasswordEntity): IUserPasswordResetInformation;
    toDomainUserResetPasswordInformations(usersResetPasswordsInformation: ResetPasswordEntity[]): IUserPasswordResetInformation[];
}
