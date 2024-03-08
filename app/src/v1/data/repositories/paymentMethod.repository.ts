import {
  DataSource,
  QueryRunner,
  FindOneOptions,
  FindManyOptions,
  DeepPartial,
} from "typeorm";
import {
  ApiFeatures,
  QueryResult,
} from "../../utils/querying/apiFeatures.util";
import { PaymentMethodEntity } from "../orm_models/paymentMethod.entity";
import dataSource from "../connection";
import {
  PaymentMethod,
  IPaymentMethod,
  ICreatePaymentMethodInput,
} from "../../domain/paymentMethod/paymentMethod";

export const paymentMethodRepoBase = (
  dbConnection: DataSource | QueryRunner
) => ({
  manager: dbConnection.manager,

  async findOne(
    findData: FindOneOptions<PaymentMethodEntity>
  ): Promise<IPaymentMethod> {
    const paymentMethod = await this.manager.findOne(
      PaymentMethodEntity,
      findData
    );
    return this.toDomainPaymentMethod(paymentMethod);
  },

  async findAll(
    findData: FindManyOptions<PaymentMethodEntity>
  ): Promise<IPaymentMethod[]> {
    const paymentMethods = await this.manager.find(
      PaymentMethodEntity,
      findData
    );
    return this.toDomainPaymentMethods(paymentMethods);
  },

  async createPaymentMethod(
    payload: ICreatePaymentMethodInput
  ): Promise<IPaymentMethod> {
    const paymentMethod = this.manager.create(PaymentMethodEntity, {
      name: payload.name,
      icon: payload.icon,
    } as DeepPartial<PaymentMethodEntity>);

    const result = await this.manager.save(PaymentMethodEntity, paymentMethod);
    return this.toDomainPaymentMethod(result);
  },

  async deletePaymentMethod(paymentMethod: IPaymentMethod): Promise<number> {
    const result = await this.manager.softDelete(
      PaymentMethodEntity,
      paymentMethod.id
    );
    return result !== null ? 1 : 0;
  },

  async findByQuery(queryParams: {
    [key: string]: string;
  }): Promise<QueryResult<IPaymentMethod>> {
    const result = await ApiFeatures.generateSqlQuery(
      dataSource,
      "paymentMethod",
      queryParams,
      {
        id: {
          operator: "eq",
        },
        name: {
          operator: "like",
        },
        isPublished: {
          operator: "eq",
        },
      }
    );
    return {
      docs: this.toDomainPaymentMethods(result.docs),
      meta: result.meta,
    };
  },

  async updatePaymentMethod(
    paymentMethod: IPaymentMethod,
    payload: Partial<PaymentMethodEntity>
  ): Promise<IPaymentMethod> {
    await this.manager.update(
      PaymentMethodEntity,
      {
        id: paymentMethod.getIdAsNumber(),
      },
      payload
    );
    const updatedPaymentMethod = await this.manager.findOne(
      PaymentMethodEntity,
      {
        where: {
          id: paymentMethod.getIdAsNumber().toString(),
        },
      }
    );
    return this.toDomainPaymentMethod(updatedPaymentMethod);
  },

  toDomainPaymentMethods(
    paymentMethods: PaymentMethodEntity[]
  ): IPaymentMethod[] {
    const domainPaymentMethod = paymentMethods.map((prismaPaymentMethod) =>
      this.toDomainPaymentMethod(prismaPaymentMethod)
    );
    return domainPaymentMethod;
  },

  toDomainPaymentMethod(
    prismaPaymentMethod: PaymentMethodEntity
  ): IPaymentMethod {
    if (!prismaPaymentMethod) {
      return null;
    }
    const paymentMethod = new PaymentMethod({
      id: prismaPaymentMethod.id,
      name: prismaPaymentMethod.name,
      icon: prismaPaymentMethod.icon,
    });
    return paymentMethod;
  },
});

export const paymentMethodRepo = paymentMethodRepoBase(dataSource);

export interface IPaymentMethodRepository {
  findOne(
    findData: FindOneOptions<PaymentMethodEntity>
  ): Promise<IPaymentMethod>;
  findAll(
    findData: FindManyOptions<PaymentMethodEntity>
  ): Promise<IPaymentMethod[]>;
  findByQuery(queryParams: {
    [key: string]: string;
  }): Promise<QueryResult<IPaymentMethod>>;
  createPaymentMethod(
    payload: ICreatePaymentMethodInput
  ): Promise<IPaymentMethod>;
  updatePaymentMethod(
    paymentMethod: IPaymentMethod,
    payload: Partial<PaymentMethodEntity>
  ): Promise<IPaymentMethod>;
  deletePaymentMethod(paymentMethod: IPaymentMethod): Promise<number>;
}
