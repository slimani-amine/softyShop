import { DataSource, FindManyOptions, FindOneOptions, QueryRunner } from "typeorm";
import { UserEntity, UsersUpdateDataPayload, UsersWherePayload } from "../orm_models/user.entity";
import { QueryResult } from "../../utils/querying/apiFeatures.util";
import { ICreateUserInput, IUser } from "../../domain/users/user";
export declare const usersRepoBase: (dbConnection: DataSource | QueryRunner) => {
    manager: import("typeorm").EntityManager;
    findOne(findData: FindOneOptions<UserEntity>): Promise<IUser>;
    findAll(findData: FindManyOptions<UserEntity>): Promise<IUser[]>;
    updateMany(updatePayload: {
        where: UsersWherePayload;
        data: UsersUpdateDataPayload;
    }): Promise<number>;
    updateOne(user: IUser, payload: Partial<UserEntity>): Promise<IUser>;
    deleteOne(user: IUser): Promise<number>;
    deleteMany(payload: Array<number>): Promise<number>;
    getUserPassword(user: IUser): Promise<string>;
    create(payload: ICreateUserInput): Promise<IUser>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<IUser>>;
    toDomainUsers(users: UserEntity[]): IUser[];
    toDomainUser(prismaUser: UserEntity): IUser;
};
export declare const usersRepo: {
    manager: import("typeorm").EntityManager;
    findOne(findData: FindOneOptions<UserEntity>): Promise<IUser>;
    findAll(findData: FindManyOptions<UserEntity>): Promise<IUser[]>;
    updateMany(updatePayload: {
        where: UsersWherePayload;
        data: UsersUpdateDataPayload;
    }): Promise<number>;
    updateOne(user: IUser, payload: Partial<UserEntity>): Promise<IUser>;
    deleteOne(user: IUser): Promise<number>;
    deleteMany(payload: Array<number>): Promise<number>;
    getUserPassword(user: IUser): Promise<string>;
    create(payload: ICreateUserInput): Promise<IUser>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<IUser>>;
    toDomainUsers(users: UserEntity[]): IUser[];
    toDomainUser(prismaUser: UserEntity): IUser;
};
export interface IUsersRepository {
    findOne(findData: FindOneOptions<UserEntity>): Promise<IUser>;
    findAll(findData: FindManyOptions<UserEntity>): Promise<IUser[]>;
    updateOne(user: IUser, payload: Partial<UserEntity>): Promise<IUser>;
    deleteOne(user: IUser): Promise<number>;
    updateMany(updatePayload: {
        where: UsersWherePayload;
        data: UsersUpdateDataPayload;
    }): Promise<number>;
    deleteMany(payload: Array<number>): Promise<number>;
    getUserPassword(user: IUser): Promise<string>;
    create(payload: ICreateUserInput): Promise<IUser>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<IUser>>;
}
