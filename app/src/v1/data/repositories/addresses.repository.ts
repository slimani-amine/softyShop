import {
  DataSource,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  QueryRunner,
} from "typeorm";
import { AddressesEntity } from "../orm_models/addresses.entity";
import {
  ICreateAddressInput,
  IAddress,
  Address,
} from "../../domain/addresses/addresses";
import dataSource from "../connection";
import {
  ApiFeatures,
  QueryResult,
} from "../../utils/querying/apiFeatures.util";
import { UserEntity } from "../orm_models/user.entity";
import { exceptionService } from "../../core/errors/exceptions";

export const addressRepoBase = (dbConnection: DataSource | QueryRunner) => ({
  manager: dbConnection.manager,

  async findOne(findData: FindOneOptions<AddressesEntity>): Promise<IAddress> {
    const address = await this.manager.findOne(AddressesEntity, findData);
    return this.toDomainAddress(address);
  },

  async findAll(
    findData: FindManyOptions<AddressesEntity>
  ): Promise<IAddress[]> {
    const addresses = await this.manager.find(AddressesEntity, findData);
    return this.toDomainAddresses(addresses);
  },

  async findMyAddresses(
    findOptions: FindManyOptions<AddressesEntity>
  ): Promise<IAddress[]> {
    const stores = await this.manager.find(AddressesEntity, findOptions);
    return this.toDomainAddresses(stores);
  },

  async createAddress(payload: ICreateAddressInput): Promise<IAddress> {
    const user = await this.manager.findOne(UserEntity, {
      where: { id: payload.user_id },
    });

    if (!user) {
      exceptionService.notFoundException({
        message: "User not found",
      });
    }

    const address = this.manager.create(AddressesEntity, {
      address: payload.address,
      phoneNumber: payload?.phoneNumber,
      city: payload.city,
      state: payload.state,
      zipCode: payload.zipCode,
      user: user,
    } as DeepPartial<AddressesEntity>);

    const result = await this.manager.save(AddressesEntity, address);
    return this.toDomainAddress(result);
  },

  async updateAddress(
    address: IAddress,
    payload: Partial<AddressesEntity>
  ): Promise<IAddress> {
    await this.manager.update(
      AddressesEntity,
      {
        id: address.getIdAsNumber(),
      },
      payload
    );
    const updatedAddress = await this.manager.findOne(AddressesEntity, {
      where: {
        id: address.getIdAsNumber().toString(),
      },
    });
    return this.toDomainAddress(updatedAddress);
  },

  async deleteAddress(address: IAddress): Promise<number> {
    const result = await this.manager.softDelete(AddressesEntity, {
      id: address.getIdAsNumber(),
    });
    return result !== null ? 1 : 0;
  },

  async deleteMany(payload: Array<number>): Promise<number> {
    const result = await this.manager.softDelete(AddressesEntity, payload);
    return result.affected;
  },

  async findByQuery(queryParams: {
    [key: string]: string;
  }): Promise<QueryResult<IAddress>> {
    const result = await ApiFeatures.generateSqlQuery(
      dataSource,
      "addresses",
      queryParams,
      {
        
      }
    );
    return {
      docs: this.toDomainAddresses(result.docs),
      meta: result.meta,
    };
  },

  toDomainAddresses(addresses: AddressesEntity[]): IAddress[] {
    const domainAddresses = addresses.map((prismaAddress) =>
      this.toDomainAddress(prismaAddress)
    );
    return domainAddresses;
  },

  toDomainAddress(prismaAddress: AddressesEntity): IAddress {
    if (!prismaAddress) {
      return null;
    }
    const address = new Address({
      id: prismaAddress.id,
      address: prismaAddress.address,
      phoneNumber: prismaAddress.phoneNumber,
      city: prismaAddress.city,
      state: prismaAddress.state,
      zipCode: prismaAddress.zipCode,
    });
    return address;
  },
});

export const addressRepo = addressRepoBase(dataSource);

export interface IAddressRepository {
  findOne(findData: FindOneOptions<AddressesEntity>): Promise<IAddress>;
  findAll(findData: FindManyOptions<AddressesEntity>): Promise<IAddress[]>;
  findByQuery(queryParams: {
    [key: string]: string;
  }): Promise<QueryResult<IAddress>>;
  findMyAddresses(
    findOptions: FindManyOptions<AddressesEntity>
  ): Promise<IAddress[]>;
  createAddress(payload: ICreateAddressInput): Promise<IAddress>;
  updateAddress(
    address: IAddress,
    payload: Partial<AddressesEntity>
  ): Promise<IAddress>;
  deleteAddress(address: IAddress): Promise<number>;
  deleteMany(payload: Array<number>): Promise<number>;
}
