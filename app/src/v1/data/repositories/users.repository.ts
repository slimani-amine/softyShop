import {
  DataSource,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  QueryRunner,
} from "typeorm";
import {
  UserEntity,
  UsersUpdateDataPayload,
  UsersWherePayload,
} from "../orm_models/user.entity";
import {
  ApiFeatures,
  QueryResult,
} from "../../utils/querying/apiFeatures.util";
import { ICreateUserInput, IUser, User } from "../../domain/users/user";
import dataSource from "../connection";

type DeepPartialWithIsVerified<T> = DeepPartial<T> & { isVerified?: boolean };

export const usersRepoBase = (dbConnection: DataSource | QueryRunner) => ({
  manager: dbConnection.manager,
  async findOne(findData: FindOneOptions<UserEntity>): Promise<IUser> {
    const user = await this.manager.findOne(UserEntity, findData);
    return this.toDomainUser(user);
  },
  async findAll(findData: FindManyOptions<UserEntity>): Promise<IUser[]> {
    const users = await this.manager.find(UserEntity, findData);
    return this.toDomainUsers(users);
  },
  async updateMany(updatePayload: {
    where: UsersWherePayload;
    data: UsersUpdateDataPayload;
  }): Promise<number> {
    const result = await this.manager.update(
      UserEntity,
      updatePayload.where,
      updatePayload.data
    );
    return result.affected;
  },
  async updateOne(user: IUser, payload: Partial<UserEntity>): Promise<IUser> {
    await this.manager.update(
      UserEntity,
      {
        id: user.getIdAsNumber(),
      },
      payload
    );
    const updatedUser = await this.manager.findOne(UserEntity, {
      where: {
        id: user.getIdAsNumber(),
      },
    });
    return this.toDomainUser(updatedUser);
  },
  async deleteOne(user: IUser): Promise<number> {
    const result = await this.manager.softDelete(UserEntity, {
      id: user.getIdAsNumber(),
    });
    return result !== null ? 1 : 0;
  },
  async deleteMany(payload: Array<number>): Promise<number> {
    const result = await this.manager.softDelete(UserEntity, payload);
    return result.affected;
  },
  async getUserPassword(user: IUser): Promise<string> {
    const userFound = await this.manager.findOne(UserEntity, {
      where: {
        id: user.getIdAsNumber(),
      },
      select: {
        password: true,
      },
    });
    return userFound.password;
  },
  async create(payload: ICreateUserInput): Promise<IUser> {
    const user = this.manager.create(UserEntity, {
      email: payload.email,
      isVerified: payload.isVerified,
      picture: payload.picture,
      firstName: payload.firstName,
      lastName: payload.lastName,
      password: payload.password,
      role: payload.role,
      phoneNumber: payload.phoneNumber,
      confirmation_token: payload.confirmation_token,
      confirmed_email: payload.confirmed_email,
    } as DeepPartialWithIsVerified<UserEntity>);

    const result = await this.manager.save(UserEntity, user);
    return this.toDomainUser(result);
  },

  async findByQuery(queryParams: {
    [key: string]: string;
  }): Promise<QueryResult<IUser>> {
    const result = await ApiFeatures.generateSqlQuery(
      dataSource,
      "users",
      queryParams,
      {
        id: {
          operator: "eq",
        },
        email: {
          operator: "eq",
        },
        "resetPassword.id": {
          operator: "injoin",
          joinTables: {
            ResetPasswords: {
              selectedFields: ["id", "token"],
            },
          },
        },
      }
    );
    return {
      docs: this.toDomainUsers(result.docs),
      meta: result.meta,
    };
  },
  toDomainUsers(users: UserEntity[]): IUser[] {
    const domainUsers = users.map((prismaUser) =>
      this.toDomainUser(prismaUser)
    );
    return domainUsers;
  },
  toDomainUser(prismaUser: UserEntity): IUser {
    if (!prismaUser) {
      return null;
    }
    const user = new User({
      id: prismaUser.id.toString(),
      email: prismaUser.email,
      isVerified: prismaUser.isVerified,
      picture: prismaUser.picture,
      firstName: prismaUser.firstName,
      lastName: prismaUser.lastName,
      password: prismaUser.password,
      role: prismaUser.role,
      phoneNumber: prismaUser.phoneNumber,
      confirmation_token: prismaUser.confirmation_token,
      confirmed_email: prismaUser.confirmed_email,
    });
    return user;
  },
});

export const usersRepo = usersRepoBase(dataSource);

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
