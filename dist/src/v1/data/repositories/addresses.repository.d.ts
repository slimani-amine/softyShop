import { DataSource, FindManyOptions, FindOneOptions, QueryRunner } from "typeorm";
import { AddressesEntity } from "../orm_models/addresses.entity";
import { ICreateAddressInput, IAddress } from "../../domain/addresses/addresses";
import { QueryResult } from "../../utils/querying/apiFeatures.util";
export declare const addressRepoBase: (dbConnection: DataSource | QueryRunner) => {
    manager: import("typeorm").EntityManager;
    findOne(findData: FindOneOptions<AddressesEntity>): Promise<IAddress>;
    findAll(findData: FindManyOptions<AddressesEntity>): Promise<IAddress[]>;
    findMyAddresses(findOptions: FindManyOptions<AddressesEntity>): Promise<IAddress[]>;
    createAddress(payload: ICreateAddressInput): Promise<IAddress>;
    updateAddress(address: IAddress, payload: Partial<AddressesEntity>): Promise<IAddress>;
    deleteAddress(address: IAddress): Promise<number>;
    deleteMany(payload: Array<number>): Promise<number>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<IAddress>>;
    toDomainAddresses(addresses: AddressesEntity[]): IAddress[];
    toDomainAddress(prismaAddress: AddressesEntity): IAddress;
};
export declare const addressRepo: {
    manager: import("typeorm").EntityManager;
    findOne(findData: FindOneOptions<AddressesEntity>): Promise<IAddress>;
    findAll(findData: FindManyOptions<AddressesEntity>): Promise<IAddress[]>;
    findMyAddresses(findOptions: FindManyOptions<AddressesEntity>): Promise<IAddress[]>;
    createAddress(payload: ICreateAddressInput): Promise<IAddress>;
    updateAddress(address: IAddress, payload: Partial<AddressesEntity>): Promise<IAddress>;
    deleteAddress(address: IAddress): Promise<number>;
    deleteMany(payload: Array<number>): Promise<number>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<IAddress>>;
    toDomainAddresses(addresses: AddressesEntity[]): IAddress[];
    toDomainAddress(prismaAddress: AddressesEntity): IAddress;
};
export interface IAddressRepository {
    findOne(findData: FindOneOptions<AddressesEntity>): Promise<IAddress>;
    findAll(findData: FindManyOptions<AddressesEntity>): Promise<IAddress[]>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<IAddress>>;
    findMyAddresses(findOptions: FindManyOptions<AddressesEntity>): Promise<IAddress[]>;
    createAddress(payload: ICreateAddressInput): Promise<IAddress>;
    updateAddress(address: IAddress, payload: Partial<AddressesEntity>): Promise<IAddress>;
    deleteAddress(address: IAddress): Promise<number>;
    deleteMany(payload: Array<number>): Promise<number>;
}
