import { DataSource, QueryRunner, FindOneOptions, FindManyOptions } from "typeorm";
import { QueryResult } from "../../utils/querying/apiFeatures.util";
import { PaymentMethodEntity } from "../orm_models/paymentMethod.entity";
import { IPaymentMethod, ICreatePaymentMethodInput } from "../../domain/paymentMethod/paymentMethod";
export declare const paymentMethodRepoBase: (dbConnection: DataSource | QueryRunner) => {
    manager: import("typeorm").EntityManager;
    findOne(findData: FindOneOptions<PaymentMethodEntity>): Promise<IPaymentMethod>;
    findAll(findData: FindManyOptions<PaymentMethodEntity>): Promise<IPaymentMethod[]>;
    createPaymentMethod(payload: ICreatePaymentMethodInput): Promise<IPaymentMethod>;
    deletePaymentMethod(paymentMethod: IPaymentMethod): Promise<number>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<IPaymentMethod>>;
    updatePaymentMethod(paymentMethod: IPaymentMethod, payload: Partial<PaymentMethodEntity>): Promise<IPaymentMethod>;
    toDomainPaymentMethods(paymentMethods: PaymentMethodEntity[]): IPaymentMethod[];
    toDomainPaymentMethod(prismaPaymentMethod: PaymentMethodEntity): IPaymentMethod;
};
export declare const paymentMethodRepo: {
    manager: import("typeorm").EntityManager;
    findOne(findData: FindOneOptions<PaymentMethodEntity>): Promise<IPaymentMethod>;
    findAll(findData: FindManyOptions<PaymentMethodEntity>): Promise<IPaymentMethod[]>;
    createPaymentMethod(payload: ICreatePaymentMethodInput): Promise<IPaymentMethod>;
    deletePaymentMethod(paymentMethod: IPaymentMethod): Promise<number>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<IPaymentMethod>>;
    updatePaymentMethod(paymentMethod: IPaymentMethod, payload: Partial<PaymentMethodEntity>): Promise<IPaymentMethod>;
    toDomainPaymentMethods(paymentMethods: PaymentMethodEntity[]): IPaymentMethod[];
    toDomainPaymentMethod(prismaPaymentMethod: PaymentMethodEntity): IPaymentMethod;
};
export interface IPaymentMethodRepository {
    findOne(findData: FindOneOptions<PaymentMethodEntity>): Promise<IPaymentMethod>;
    findAll(findData: FindManyOptions<PaymentMethodEntity>): Promise<IPaymentMethod[]>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<IPaymentMethod>>;
    createPaymentMethod(payload: ICreatePaymentMethodInput): Promise<IPaymentMethod>;
    updatePaymentMethod(paymentMethod: IPaymentMethod, payload: Partial<PaymentMethodEntity>): Promise<IPaymentMethod>;
    deletePaymentMethod(paymentMethod: IPaymentMethod): Promise<number>;
}
