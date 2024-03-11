import {
  DataSource,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  QueryRunner,
} from "typeorm";
import { ICreateOrderInput, IOrder, Order } from "../../domain/order/order";
import dataSource from "../connection";
import { OrderEntity } from "../orm_models/orders.entity";
import { calculateEstimatedDeliveryDate } from "../../utils/helpers/calculateEstimatedDay";

export const orderRepoBase = (dbConnection: DataSource | QueryRunner) => ({
  manager: dbConnection.manager,
  async findOne(findData: FindOneOptions<OrderEntity>): Promise<any> {
    const order = await this.manager.findOne(OrderEntity, findData);
    return order;
  },

  async findAll(findData: FindManyOptions<OrderEntity>): Promise<IOrder[]> {
    const orders = await this.manager.find(OrderEntity, findData);
    return this.toDomainOrders(orders);
  },

  async createOrder(payload: ICreateOrderInput): Promise<IOrder> {
    const order = this.manager.create(OrderEntity, {
      estimatedDeliveryDate: calculateEstimatedDeliveryDate(),
      cart_id: payload.cart_id,
    } as DeepPartial<OrderEntity>);

    const result = await this.manager.save(OrderEntity, order);
    return this.toDomainOrder(result);
  },

  async updateOrder(
    order: IOrder,
    payload: Partial<OrderEntity>
  ): Promise<IOrder> {
    payload.estimatedDeliveryDate = calculateEstimatedDeliveryDate();
    await this.manager.update(
      OrderEntity,
      {
        id: order.getIdAsNumber(),
      },
      payload
    );
    const updatedOrder = await this.manager.findOne(OrderEntity, {
      where: {
        id: order.getIdAsNumber().toString(),
      },
    });
    return this.toDomainOrder(updatedOrder);
  },

  toDomainOrders(orders: OrderEntity[]): IOrder[] {
    const domainOrders = orders.map((prismaOrder) =>
      this.toDomainOrder(prismaOrder)
    );
    return domainOrders;
  },

  toDomainOrder(prismaOrder: OrderEntity): IOrder {
    if (!prismaOrder) {
      return null;
    }
    const order = new Order({
      id: prismaOrder.id,
      estimatedDeliveryDate: prismaOrder.estimatedDeliveryDate,
      status: prismaOrder.status,
    });
    return order;
  },
});

export const orderRepo = orderRepoBase(dataSource);

export interface IOrderRepository {
  findOne(findData: FindOneOptions<OrderEntity>): Promise<IOrder>;
  findAll(findData: FindManyOptions<OrderEntity>): Promise<IOrder[]>;

  createOrder(payload: ICreateOrderInput): Promise<IOrder>;
  updateOrder(order: IOrder, payload: Partial<OrderEntity>): Promise<IOrder>;
}
