import { dataSource } from '../connection';
import {
  ICreateUserPasswordResetInformation,
  IUserPasswordResetInformation,
  UserPasswordResetInformation,
} from '../../domain/users/user';
import { usersRepoBase } from './users.repository';
import { DataSource, QueryRunner } from 'typeorm';
import {
  ResetPasswordEntity,
  ResetPasswordFindPayload,
  ResetPasswordUpadteDataPayload,
} from '../orm_models/resetpassword.entity';

export const userPasswordResetInformationRepositoryBase = (
  dbConnection: DataSource | QueryRunner = dataSource,
) => ({
  manager: dbConnection.manager,
  async findOne(findData: ResetPasswordFindPayload): Promise<IUserPasswordResetInformation> {
    const passwordResetInformation = await this.manager.findOne(ResetPasswordEntity, findData);
    return this.toDomainUserResetPasswordInformation(passwordResetInformation);
  },
  async updateOne(
    userResetPasswordInformation: IUserPasswordResetInformation,
    payload: ResetPasswordUpadteDataPayload,
  ): Promise<IUserPasswordResetInformation> {
    await this.manager.update(
      ResetPasswordEntity,
      {
        id: userResetPasswordInformation.getIdAsNumber(),
      },
      {
        user_id: payload?.user_id,
        expirationDate: payload?.expirationDate,
        token: payload?.token,
      },
    );
    const updatedUserResetPasswordInformation = await this.manager.findOne(ResetPasswordEntity, {
      where: {
        id: userResetPasswordInformation.getIdAsNumber(),
      },
    });
    return this.toDomainUserResetPasswordInformation(updatedUserResetPasswordInformation);
  },
  async deleteOne(userResetPasswordInformation: IUserPasswordResetInformation): Promise<number> {
    const result = await this.manager.delete(ResetPasswordEntity, {
      id: userResetPasswordInformation.getIdAsNumber(),
    });
    return result !== null ? 1 : 0;
  },
  async deleteMany(payload: Array<number>): Promise<number> {
    const result = await this.manager.delete(ResetPasswordEntity, payload);
    return result.affected;
  },
  async create(
    payload: ICreateUserPasswordResetInformation,
  ): Promise<IUserPasswordResetInformation> {
    const entity = this.manager.create(ResetPasswordEntity, {
      token: payload.token,
      user_id: parseInt(payload.userId),
      expirationDate: payload.expirationDate,
    });
    const result = await this.manager.save(ResetPasswordEntity, entity);
    return this.toDomainUserResetPasswordInformation(result);
  },
  toDomainUserResetPasswordInformations(
    usersResetPasswordsInformation: ResetPasswordEntity[],
  ): IUserPasswordResetInformation[] {
    const domainUsersResetPasswordsInformation = usersResetPasswordsInformation.map(
      (prismaUserResetPasswordInformation) =>
        this.toDomainUserResetPasswordInformation(prismaUserResetPasswordInformation),
    );
    return domainUsersResetPasswordsInformation;
  },
  toDomainUserResetPasswordInformation(
    prismaUserResetPasswordInformation: ResetPasswordEntity,
  ): IUserPasswordResetInformation {
    if (!prismaUserResetPasswordInformation) {
      return null;
    }
    const userPasswordResetInformation = new UserPasswordResetInformation({
      id: prismaUserResetPasswordInformation.id.toString(),
      token: prismaUserResetPasswordInformation.token,
      createdAt: prismaUserResetPasswordInformation.createdAt,
      updatedAt: prismaUserResetPasswordInformation.updatedAt,
      userId: prismaUserResetPasswordInformation.user_id,
      user: usersRepoBase(dataSource).toDomainUser(prismaUserResetPasswordInformation.user),
    });
    return userPasswordResetInformation;
  },
});
export const userPasswordResetInformationRepository =
  userPasswordResetInformationRepositoryBase(dataSource);
export interface IUserPasswordResetInformationsRepository {
  findOne(findData: ResetPasswordFindPayload): Promise<IUserPasswordResetInformation>;
  updateOne(
    userResetPasswordInformation: IUserPasswordResetInformation,
    payload: ResetPasswordUpadteDataPayload,
  ): Promise<IUserPasswordResetInformation>;
  deleteOne(userResetPasswordInformation: IUserPasswordResetInformation): Promise<number>;
  deleteMany(payload: Array<number>): Promise<number>;
  create(payload: ICreateUserPasswordResetInformation): Promise<IUserPasswordResetInformation>;
}
export interface IUserPasswordResetInformationsRepositoryExtra
  extends IUserPasswordResetInformationsRepository {
  toDomainUserResetPasswordInformation(
    prismaUserResetPasswordInformation: ResetPasswordEntity,
  ): IUserPasswordResetInformation;
  toDomainUserResetPasswordInformations(
    usersResetPasswordsInformation: ResetPasswordEntity[],
  ): IUserPasswordResetInformation[];
}
